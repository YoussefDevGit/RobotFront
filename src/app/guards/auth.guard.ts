import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var token = localStorage.getItem('token');
    if (token) {
      var decoded = jwtDecode(token);
      const date = new Date(0);

      let tokenExpDate = date.setUTCSeconds(decoded.exp);
      // Connecté
      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        // console.log(new Date(tokenExpDate));
        return true;
      }
      // else :
      localStorage.removeItem('token');
      localStorage.clear();
      this.router.navigate(["auth", "login"]);
      this.toastr.error("Votre session est expirée", "Échec");
      return false;

    } else {
      // this.toastr.error("Vous n'êtes pas connécté", "Échec");
      this.router.navigate(["/"]);
      localStorage.clear();
      // this.router.navigate(["auth", "login"]);
      return false;
    }
  }

}
