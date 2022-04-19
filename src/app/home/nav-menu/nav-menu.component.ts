import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  userRole!: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.userRoles[0].authority;
  }

  logout(): void {
    // DO LOGOUT STUFF
    this.router.navigate(['/login']);
  }
}
