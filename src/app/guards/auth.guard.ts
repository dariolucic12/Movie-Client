import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: LoginComponent, private router: Router) {

  }

  canActivate(): boolean {
    if(this.auth.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
  
}
