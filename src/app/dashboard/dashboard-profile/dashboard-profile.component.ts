import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/MyLogin.model';
import { LoginService } from 'src/app/services/samad-services/login.services';

@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {

  constructor(
    private connServ: LoginService
  ) {
    this.getConnectedUser();
  }

  ngOnInit(): void {
  }

  user: Users = {};
  getConnectedUser() {
    this.connServ.getConnectedUser().subscribe(
      (res: Users) => {
        // if (res) {
        this.user = res;
        // } else {
        //   // this.deconnexion();
        // }
      }, err => {
        console.log(err);
      }
    )
  }
}
