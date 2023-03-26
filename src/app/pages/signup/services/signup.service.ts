import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, ResSignUpStatus } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private apiURL = "http://localhost:3000/signup"
  constructor(private http: HttpClient) { }

  registerUser(user: User) : Observable<ResSignUpStatus>{
    return this.http.post<ResSignUpStatus>(this.apiURL, user)
  }
}
