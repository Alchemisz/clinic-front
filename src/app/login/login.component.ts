import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  authSubScription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.authSubScription.unsubscribe();
  }

  onLogin(loginFormRef: NgForm) {
    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login(
      loginFormRef.value['login'],
      loginFormRef.value['password']
    );

    // authObs = this.authService.login('user', 'password');

    this.authSubScription = authObs.subscribe((response) => {
      this.authService.navigateByUserRole();
    });
  }
}
