import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { Status } from 'src/app/models/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  signupStatus: Status = "notTriggered"
  constructor(private signupService: SignupService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("Sign Up | News Feed")
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return

    this.signupStatus = "checking"
    this.signupService.registerUser(form.value)
      .pipe(
        tap(res => this.signupStatus = res.status)
      )
      .subscribe({
        complete: () => {
          if(this.signupStatus === "approved") {
            this.router.navigate(["/"], { state: { status: this.signupStatus } })
          }
        }
      })
  }
}

