import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Subject, tap } from 'rxjs';
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
  pesel = new Subject<string>();

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

  getPatientUserPesel() {
    this.http
      .get('http://localhost:8080/patient/pesel')
      .subscribe((response) => {
        this.pesel.next(response as string);
      });
  }

  navigateByUserRole() {
    this.http.get('http://localhost:8080/user/roles').subscribe((response) => {
      this.userRoles = response as { authority: string }[];
      if (this.userRoles[0].authority === 'ROLE_ADMIN') {
        this.router.navigate(['/pacjenci']);
      }
      if (this.userRoles[0].authority === 'ROLE_USER') {
        this.router.navigate(['/pacjent']);
      }
    });
  }

  private handleAuthentication(username: string, token: string) {
    const user = new User(username, token);
    this.user.next(user);
  }
}
