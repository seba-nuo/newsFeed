import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, ResStatus } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private apiURL = "http://localhost:3000/signup"
  constructor(private http: HttpClient) { }

  registerUser(user: User) : Observable<ResStatus>{
    return this.http.post<ResStatus>(this.apiURL, user)
  }
}
