import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  updateRequest(request: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/requests/${request.id}`, request);
  }

  deleteRequest(requestId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/requests/${requestId}`);
  }

  validRequestsNumber(userId: string): Observable<boolean> {
  return this.getUserRequests(userId).pipe(
    map(requests => {
      const pendingOrRejected = requests.filter(
        request => request.status === 'pending' || request.status === 'rejected'
      );
      return pendingOrRejected.length < 3;
    })
  );
}
}
