import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../models/ComponentCanDeactivate';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class PosGuard implements  CanDeactivate<ComponentCanDeactivate> {
 
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.canDeactivate()) {
        return true;
      } else {
        return confirm("You will lose your current bill data if you leave the page. Do you want to procced?")
      }
  }
  
}
