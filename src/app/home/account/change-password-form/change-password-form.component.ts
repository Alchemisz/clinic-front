import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css'],
})
export class ChangePasswordFormComponent implements OnInit, OnDestroy {
  user!: User | null;
  userSub!: Subscription;

  constructor(
    private accountService: AccountServiceService,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onFormSubmit(formRef: NgForm) {
    if (formRef.value['password'] !== formRef.value['passwordRepeat']) {
      this.snackBarService.openSnackBar(
        'Potwrzórzone nowe hasło nie jest identyczne z podstawowym!',
        'Zamknij'
      );
      return;
    }

    let createPatientCommand = {
      oldPassword: formRef.value['oldPassword'],
      newPassword: formRef.value['password'],
    };

    this.accountService.changeUserPassword(
      createPatientCommand,
      this.user!.userId
    );
  }
}
