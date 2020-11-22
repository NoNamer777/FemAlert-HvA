import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private userService: UserService) { }

  /**
   * Check if user is authenticated if not redirect to login page
   */
  canActivate(): boolean {
    if (!this.userService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    } else return true;
  }
}
