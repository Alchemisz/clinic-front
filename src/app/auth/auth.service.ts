import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  userRoles!: { authority: string }[];

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>('http://localhost:8080/authenticate', {
        username: username,
        password: password,
      })
      .pipe(
        tap((responseData) => {
          this.handleAuthentication(username, responseData.jwt);
        })
      );
  }

  getUserRoles() {
    this.http.get('http://localhost:8080/user/roles').subscribe((response) => {
      this.userRoles = response as { authority: string }[];
      this.router.navigate(['/pacjenci']);
    });
  }

  private handleAuthentication(username: string, token: string) {
    const user = new User(username, token);
    this.user.next(user);
  }
}
