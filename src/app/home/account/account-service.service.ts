import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AccountServiceService implements OnInit, OnDestroy {
  user!: User | null;
  userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {}

  changeUserPassword(changePasswordRequestBody: any, userId: number) {
    this.http
      .patch(
        'http://localhost:8080/password/change/' + userId,
        changePasswordRequestBody
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.snackBarService.openSnackBar(error.message, 'Zamknij');
          return throwError(() => new Error('error.message'));
        })
      )
      .subscribe((response) => {
        this.snackBarService.openSnackBar(
          'Hasło zostało pomyślnie zmienione!',
          'Zamknij'
        );
      });
  }
}
