import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/MyLogin.model';
import { LoginService } from 'src/app/services/samad-services/login.services';

class RoutesInfos {
  route?: string;
  libelle?: string;
  icon?: string;
  roles?: string[]
}

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isLessThenLargeDevice;
  myRoutes: RoutesInfos[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private connServ: LoginService) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });

    this.getConnectedUser();
  }

  SeDeconnecter() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    this.router.navigate(["auth", "login"]);
  }

  user: Users = {};
  getConnectedUser() {
    this.connServ.getConnectedUser().subscribe(
      (res: Users) => {
        // if (res) {
        this.user = res;
        this.myRoutes = this.RootsManag(this.user.role);
        // } else {
        //   // this.deconnexion();
        // }
      }, err => {
        console.log(err);
      }
    )
  }

  RootsManag(role: string) {
    let allroutes: RoutesInfos[] = [
      // {
      //   route: "dashbaord",
      //   icon: 'dashboard',
      //   libelle: "Dashbaord",
      //   roles: ["Administrateur"]
      // },
      {
        route: "profile",
        icon: 'person',
        libelle: "Mon profil",
        roles: ["all"]
      },
      {
        route: "perso-infos",
        icon: 'infos',
        libelle: "Informations de l'entreprise",
        roles: ["Administrateur"]
      },
      {
        route: "contactus",
        icon: 'contact_mail',
        libelle: "Messages",
        roles: ["Administrateur"]
      },
      {
        route: "categories",
        icon: 'dns',
        libelle: "Gestion catégories",
        roles: ["Administrateur"]
      },
      {
        route: "produits",
        icon: 'bookmark_border',
        libelle: "Gestion produits",
        roles: ["Administrateur"]
      },
      {
        route: "projets",
        icon: 'work_outline',
        libelle: "Gestion projets",
        roles: ["Administrateur"]
      },
      {
        route: "commandes",
        icon: 'shopping_cart',
        libelle: "Gestion commandes",
        roles: ["Administrateur"]
      },
      {
        route: "partenaires",
        icon: 'handshake',
        libelle: "Gestion partenaires",
        roles: ["Administrateur"]
      },
      {
        route: "slides",
        icon: 'swipe',
        libelle: "Gestion accueil",
        roles: ["Administrateur"]
      }];

    return allroutes.slice().filter(f => f.roles.some(r => r == "all" || r == role));
  }

}
