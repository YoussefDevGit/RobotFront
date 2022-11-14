import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyLogin } from 'src/app/models/MyLogin.model';
import { LoginService } from 'src/app/services/samad-services/login.services';
import * as jwtDecode from 'jwt-decode';


@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: MyLogin = {};
  constructor(
    private connServ: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.VerifierConnexion();
  }

  ngOnInit(): void {
  }

  VerifierConnexion() {
    var token = localStorage.getItem('token');
    if (token) {
      var decoded = jwtDecode(token);
      const date = new Date(0);

      let tokenExpDate = date.setUTCSeconds(decoded.exp);
      // Connecté
      if (tokenExpDate.valueOf() > new Date().valueOf()) {
        this.router.navigate(["dashboard"]);
      }
    }
  }

  onConnect;
  SeConnecter() {
    this.onConnect = true;
    this.toastr.clear();
    this.connServ.login(this.login).subscribe(
      (succ: any) => {
        this.onConnect = false;
        if (succ && succ.logged) {
          localStorage.clear();
          localStorage.removeItem('token');
          localStorage.setItem('token', succ.token);
          this.router.navigate(['dashboard']);
        } else if (succ && !succ.logged) {
          this.toastr.error("Informations de connexion incorrectes", "Echec");
        }

      }, err => {
        this.onConnect = false;
        this.toastr.warning("Veuillez réessayer plutard", "Echec");
      }
    )
  }

}
