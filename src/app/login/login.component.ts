import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    
    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login("user", "password");

    authObs.subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/pacjenci']);
      }
    );

  }

}
