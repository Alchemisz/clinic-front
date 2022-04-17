import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-account-info-form',
  templateUrl: './account-info-form.component.html',
  styleUrls: ['./account-info-form.component.css']
})
export class AccountInfoFormComponent implements OnInit, OnDestroy, AfterViewInit {

  user!: User | null;
  userSub!: Subscription;

  @ViewChild('username')
  usernameField!: ElementRef;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.usernameField.nativeElement.value = this.user!.login;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

}
