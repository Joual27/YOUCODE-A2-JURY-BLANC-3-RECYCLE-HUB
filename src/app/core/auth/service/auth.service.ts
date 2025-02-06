import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegistrationData } from '../../../modules/auth/models/auth.models';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environments.apiUrl;
  constructor() { }

  register(payload : RegistrationData) : Observable<RegistrationData>{
    return this.http.post<RegistrationData>(`${this.apiUrl}/users` , payload);
  }
}
