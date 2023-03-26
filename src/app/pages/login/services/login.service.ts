import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private apiURL = "http://localhost:3000/login"
  private isLoggedApiURL = "http://localhost:3000/islogged"
  constructor(private http: HttpClient) { }

  loginUser(user: User) : Observable <{user: User, status: Status}> {
    return this.http.post<{user: User, status: Status}>(this.apiURL, user)
  }

  isLogged(): Observable<any> {
    return this.http.get<any>(this.isLoggedApiURL)
  }
}