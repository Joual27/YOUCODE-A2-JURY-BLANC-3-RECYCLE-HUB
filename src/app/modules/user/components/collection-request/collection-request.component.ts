import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Request, User, WasteItem, WasteType } from '../../../../shared/models';
import { Store } from '@ngrx/store';
import { CollectionRequestService } from '../../services/collection-request.service';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-request',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './collection-request.component.html',
  styleUrl: './collection-request.component.css'
})
export class CollectionRequestComponent {
  requestForm: FormGroup;
  currentUser: User | null = null;
  wasteTypes: WasteType[] = ['plastic', 'glass', 'paper', 'metal'];
  totalWeight: number = 0;
  totalPoints: number = 0;
  shownErrorMsg = signal<boolean>(false);
  erroMsg : string = "";
  shownSuccessMsg = signal<boolean>(false);
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private collectionRequestService = inject(CollectionRequestService);
  private router = inject(Router);

  constructor(  ) {
    this.requestForm = this.fb.group({
      wastes: this.fb.array([]),
      collectionAddress: ['', Validators.required],
      collectionDateTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.select(selectSignedInUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.requestForm.patchValue({
          collectionAddress: user.address
        });
      }
    });

    this.initWastesFormArray();
  }

  get wastes() {
    return this.requestForm.get('wastes') as FormArray;
  }

  initWastesFormArray() {
    this.wasteTypes.forEach(type => {
      this.wastes.push(this.fb.group({
        type: type,
        weight: [0, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  calculateTotalWeight() {
    this.totalWeight = this.wastes.controls.reduce((total, control) => {
      return total + control.get('weight')?.value;
    }, 0);
  }

  calculatePoints() {
    this.totalPoints = this.wastes.controls.reduce((total, control) => {
      const type = control.get('type')?.value;
      const weight = control.get('weight')?.value;
      switch (type) {
        case 'plastic': return total + weight * 2;
        case 'glass': return total + weight * 1;
        case 'paper': return total + weight * 1;
        case 'metal': return total + weight * 5;
        default: return total;
      }
    }, 0);
  }

  onSubmit() {
    if (this.requestForm.valid && this.currentUser) {
      if(this.totalWeight >= 1 && this.totalWeight <= 10){
        const wasteItems: WasteItem[] = this.wastes.value.filter((waste: WasteItem) => waste.weight > 0);
        const request: Partial<Request> = {
          userId: this.currentUser.id!,
          wastes: wasteItems,
          collectionAddress: this.requestForm.get('collectionAddress')?.value,
          collectionDateTime: this.requestForm.get('collectionDateTime')?.value,
          status: 'pending',
          points: this.totalPoints
        };

        this.collectionRequestService.createRequest(request).subscribe({
          next: (createdRequest) => {
            this.shownSuccessMsg.set(true);
            setTimeout(() => {
              this.shownSuccessMsg.set(false);
              this.router.navigate(["/user/requests"])
            } , 2500)
            console.log('Request created successfully', createdRequest);
          },
          error: (error) => console.error('Error creating request:', error)
        });
      }else{
        this.shownErrorMsg.set(true);
        setTimeout(() => {
          this.shownErrorMsg.set(false);
        } , 2500)
      }
    }
  }
}
