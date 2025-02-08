import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {
  private apiUrl = environments.apiUrl;
  private http = inject(HttpClient);

  createRequest(request: Partial<Request>): Observable<Request> {
    return this.http.post<Request>(`${this.apiUrl}/requests`, request);
  }

  getUserRequests(userId: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests?userId=${userId}`);
  }

  updateRequest(requestId: string, updates: Partial<Request>): Observable<Request> {
    return this.http.patch<Request>(`${this.apiUrl}/requests/${requestId}`, updates);
  }

  deleteRequest(requestId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/requests/${requestId}`);
  }
}
