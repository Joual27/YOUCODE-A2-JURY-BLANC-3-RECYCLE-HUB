import { Component, inject } from '@angular/core';
import { Request, User } from '../../../../shared/models';
import { CollectionRequestService } from '../../services/collection-request.service';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { CommonModule } from '@angular/common';
import { CollectionRequestItemComponent } from "../collection-request-item/collection-request-item.component";

@Component({
  selector: 'app-collection-request-list',
  imports: [CommonModule, CollectionRequestItemComponent],
  templateUrl: './collection-request-list.component.html',
  styleUrl: './collection-request-list.component.css'
})
export class CollectionRequestListComponent {
  requests: Request[] = [];
  currentUser: User | null = null;
  private collectionRequestService = inject(CollectionRequestService);
  private store = inject(Store);

  ngOnInit() {
    this.store.select(selectSignedInUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.loadUserRequests();
      }
    });
  }

  loadUserRequests() {
    if (this.currentUser) {
      this.collectionRequestService.getUserRequests(this.currentUser.id!).subscribe({
        next: (requests) => {
          this.requests = requests;
        },
        error: (error) => console.error('Error loading requests:', error)
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'bg-yellow-200 text-yellow-800';
      case 'occupied': return 'bg-blue-200 text-blue-800';
      case 'in_progress': return 'bg-purple-200 text-purple-800';
      case 'completed': return 'bg-green-200 text-green-800';
      case 'rejected': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  }
}
