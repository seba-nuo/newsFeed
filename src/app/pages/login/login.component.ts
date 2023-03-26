import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { tap } from 'rxjs/operators';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userAdded = false
  hideUserAdded = false
  userData = {}
  loginStatus: Status = "notTriggered"

  constructor(private router: Router, private login: LoginService, private titleService: Title) {
    this.titleService.setTitle("Login | News Feed")

    if (!this.router.getCurrentNavigation()) return

    const state = this.router.getCurrentNavigation()?.extras.state
    if (!state?.["status"]) return

    this.userAdded = state["status"] === "success"

    setTimeout(() => {
      this.hideUserAdded = true
    }, 2000)
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginStatus = "checking..."
      this.login.loginUser(form.value).pipe(
        tap(res => {
          this.loginStatus = res.status
          if(res.status === "success") {
            this.userData = {
              name: res.user.name,
              email: res.user.email
            }
          }
        })
      ).subscribe(
        {
          complete: () => {
            if(this.loginStatus === "success"){
              this.router.navigate(["/home"], {state: { user: this.userData }})
            }
          }
        }
      )
    }
  }

  ngOnInit(): void {
    
  }
}
