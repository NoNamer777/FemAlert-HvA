import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private authenticateService: AuthenticateService) { }

  /**
   * Check if user is authenticated if not redirect to login page
   * todo: Proper version
   */
  canActivate(): boolean {
    if (!this.authenticateService.checkAuthentication()) {
      this.router.navigate(['/login']);
      return false;
    } else return true;
  }

}
