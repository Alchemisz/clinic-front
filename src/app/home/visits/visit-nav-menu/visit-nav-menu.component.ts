import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-visit-nav-menu',
  templateUrl: './visit-nav-menu.component.html',
  styleUrls: ['./visit-nav-menu.component.css'],
})
export class VisitNavMenuComponent implements OnInit, AfterViewInit {
  userRole!: string;
  pesel!: string;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.userRole = this.authService.userRoles[0].authority;
  }
}
