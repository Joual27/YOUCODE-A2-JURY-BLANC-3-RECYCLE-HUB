// src/app/modules/collection/components/collector-requests/collector-requests.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Request, User, WasteItem } from '../../../../shared/models';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CollectionRequestService } from '../../../user/services/collection-request.service';

@Component({
  selector: 'app-collector-requests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './collector-requests.component.html',
  styleUrls: ['./collector-requests.component.css']
})
export class CollectorRequestsComponent implements OnInit {
  collectorRequests: Request[] = [];
  currentUser: User | null = null;
  selectedRequest: Request | null = null;
  updateForm: FormGroup;
  private collectionRequestService = inject(CollectionRequestService);
  private store  = inject(Store);
  private fb = inject(FormBuilder);

  constructor() {
    this.updateForm = this.fb.group({
      wastes: this.fb.array([])
    });
  }

  ngOnInit() {
    this.store.select(selectSignedInUser).subscribe(user => {
      if (user && user.role === 'collector') {
        this.currentUser = user;
        this.loadCollectorRequests();
      }
    });
  }

  loadCollectorRequests() {
    if (this.currentUser) {
      this.collectionRequestService.getCollectorRequests(this.currentUser.id!).subscribe({
        next: (requests) => {
          this.collectorRequests = requests;
        },
        error: (error) => console.error('Error loading collector requests:', error)
      });
    }
  }

  markAsInProgress(request: Request) {
    this.collectionRequestService.hasInProgressRequest(this.currentUser!.id!).subscribe(hasInProgress => {
      if (!hasInProgress) {
        this.collectionRequestService.updateRequestStatus(request.id, 'in_progress').subscribe({
          next: (updatedRequest) => {
            const index = this.collectorRequests.findIndex(r => r.id === updatedRequest.id);
            if (index !== -1) {
              this.collectorRequests[index] = updatedRequest;
            }
          },
          error: (error) => console.error('Error marking request as in progress:', error)
        });
      } else {
        alert('You already have a request in progress. Please complete or reject it before starting a new one.');
      }
    });
  }

  get wastes(): FormArray {
    return this.updateForm.get('wastes') as FormArray;
  }
  

  openUpdateForm(request: Request) {
    this.selectedRequest = request;
    const wastesFormArray = this.updateForm.get('wastes') as FormArray;
    wastesFormArray.clear();
    request.wastes.forEach(waste => {
      wastesFormArray.push(this.fb.group({
        type: [waste.type],
        weight: [waste.weight, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  validateRequest() {
    if (this.updateForm.valid && this.selectedRequest) {
      const updatedWastes = this.updateForm.value.wastes;
      this.collectionRequestService.validateRequest(this.selectedRequest.id, updatedWastes).subscribe({
        next: (validatedRequest) => {
          const pointsToAdd = this.calculatePoints(updatedWastes);
          this.collectionRequestService.updateUserPoints(validatedRequest.userId, pointsToAdd).subscribe({
            next: () => {
              this.loadCollectorRequests();
              this.selectedRequest = null;
            },
            error: (error) => console.error('Error updating user points:', error)
          });
        },
        error: (error) => console.error('Error validating request:', error)
      });
    }
  }

  rejectRequest() {
    if (this.selectedRequest) {
      this.collectionRequestService.rejectRequest(this.selectedRequest.id).subscribe({
        next: () => {
          this.loadCollectorRequests();
          this.selectedRequest = null;
        },
        error: (error) => console.error('Error rejecting request:', error)
      });
    }
  }

  private calculatePoints(wastes: WasteItem[]): number {
    return wastes.reduce((total, waste) => {
      switch (waste.type) {
        case 'plastic': return total + waste.weight * 2;
        case 'glass': return total + waste.weight * 1;
        case 'paper': return total + waste.weight * 1;
        case 'metal': return total + waste.weight * 5;
        default: return total;
      }
    }, 0);
  }
}