import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './auth-files/_services';
import { User } from './auth-files/_models';
import { Role } from './auth-files/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
      return this.currentUser && this.currentUser.tipo === Role.Administrador;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}