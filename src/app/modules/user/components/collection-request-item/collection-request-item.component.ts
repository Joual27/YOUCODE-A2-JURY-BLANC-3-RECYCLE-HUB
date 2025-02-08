import { Component, Input } from '@angular/core';
import { Request } from '../../../../shared/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection-request-item',
  imports: [CommonModule],
  templateUrl: './collection-request-item.component.html',
  styleUrl: './collection-request-item.component.css'
})
export class CollectionRequestItemComponent {
  @Input() request !: Request;

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
