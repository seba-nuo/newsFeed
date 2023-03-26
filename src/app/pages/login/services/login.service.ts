import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private apiURL = "http://localhost:3000/login"
  constructor(private http: HttpClient) { }

  loginUser(user: any) : Observable < any > {
    return this.http.post<any>(this.apiURL, user)
  }
}