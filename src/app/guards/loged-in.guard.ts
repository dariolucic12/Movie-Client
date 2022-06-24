import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LogedInGuard implements CanActivate {

  constructor(private loginAuth: LoginComponent, private router: Router) {

  }
  canActivate(){
    if(this.loginAuth.isAuthenticated()){
      this.router.navigate(['/pages/home'])
      return false;
    }
    return true;
  }
  
}
