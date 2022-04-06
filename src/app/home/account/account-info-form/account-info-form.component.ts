import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-account-info-form',
  templateUrl: './account-info-form.component.html',
  styleUrls: ['./account-info-form.component.css']
})
export class AccountInfoFormComponent implements OnInit, OnDestroy {

  user!: User;
  userSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      console.log(user);
    });
  }

}
