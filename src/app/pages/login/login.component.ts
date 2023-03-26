import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userAdded = false
  hideUserAdded = false

  constructor(private router: Router, private login: LoginService, private titleService: Title) {
    this.titleService.setTitle("Login | News Feed")

    if (!this.router.getCurrentNavigation()) return

    const state = this.router.getCurrentNavigation()?.extras.state
    if (!state?.["status"]) return

    this.userAdded = true

    setTimeout(() => {
      this.hideUserAdded = true
    }, 2000)
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.login.loginUser(form.value).pipe(
        tap(res => console.log(res))
      ).subscribe(
        {
          complete: () => console.log("complete")
        }
      )
    }
  }

  ngOnInit(): void {
    
  }
}
