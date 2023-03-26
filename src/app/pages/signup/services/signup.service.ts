import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResStatus } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private apiURL = "http://localhost:3000/signup"
  private sessionApiURL = "http://localhost:3000/session"
  
  constructor(private http: HttpClient) { }

  registerUser(user: User) : Observable<ResStatus>{
    return this.http.post<ResStatus>(this.apiURL, user)
  }

  session(): Observable<any> {
    return this.http.get<any>(this.sessionApiURL)
  }
}
