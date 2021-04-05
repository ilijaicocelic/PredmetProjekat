import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ProfileComponentGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      try {
        var decoded=jwt_decode(localStorage.getItem("token"));
       
        if (decoded.Roles != "NonRegistred" ) 
        {
          return true;
        }
      }
      catch{}
   
    alert('Da biste pristupili ovom linku, morate biti prijavljeni na sajt!');
    return ;
  }
  
}
