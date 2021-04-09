import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../shared/auth.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AboutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isLogIn()) {
      return true;
    } else {
      this.router.navigate(['product/mobile']);
      return false;
    }
  }
}
