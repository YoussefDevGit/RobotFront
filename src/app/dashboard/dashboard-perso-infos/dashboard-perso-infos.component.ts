import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MonEntreprise } from 'src/app/models/Gestion.model';
import { Users } from 'src/app/models/MyLogin.model';
import { EntrepriseService } from 'src/app/services/samad-services/entreprise.services';
import { LoginService } from 'src/app/services/samad-services/login.services';

@Component({
  selector: 'll-dashboard-perso-infos',
  templateUrl: './dashboard-perso-infos.component.html',
  styleUrls: ['./dashboard-perso-infos.component.scss']
})
export class DashboardPersoInfosComponent implements OnInit {

  entreprise: MonEntreprise = {
  };
  constructor(
    private entServ: EntrepriseService,
    private toastr: ToastrService
  ) {
    this.getEntrepriseInfos();
  }

  ngOnInit(): void {
  }

  user: Users = {};
  getEntrepriseInfos() {
    this.entServ.getEntrepriseInfos().subscribe(
      (res: MonEntreprise) => {
        console.log(res);
        if (res) {
          this.entreprise = res;
        }
        if (!this.entreprise.monEntrepriseAdresses || this.entreprise.monEntrepriseAdresses.length <= 0) {
          this.entreprise.monEntrepriseAdresses = [{}];
        }
        if (!this.entreprise.monEntrepriseTelephones || this.entreprise.monEntrepriseTelephones.length <= 0) {
          this.entreprise.monEntrepriseTelephones = [{}];
        }
        if (!this.entreprise.monEntrepriseEmails || this.entreprise.monEntrepriseEmails.length <= 0) {
          this.entreprise.monEntrepriseEmails = [{}];
        }
      }, err => {
        console.log(err);
      }
    )
  }

  submit() {
    console.log(this.entreprise);
    // update:
    if (this.entreprise.idEnt) {

    } else /* add */ {

    }
    this.entreprise.monEntrepriseAdresses = this.entreprise.monEntrepriseAdresses.filter(f => f.adresse);
    this.entreprise.monEntrepriseEmails = this.entreprise.monEntrepriseEmails.filter(f => f.email);
    this.entreprise.monEntrepriseTelephones = this.entreprise.monEntrepriseTelephones.filter(f => f.tel);

    this.entServ.EntrepriseInfos(this.entreprise).subscribe(
      (res: MonEntreprise) => {
        // console.log(res);
        if (res) {
          this.entreprise = res;
        }
        if (!this.entreprise.monEntrepriseAdresses) {
          this.entreprise.monEntrepriseAdresses = [{}];
        }
        if (!this.entreprise.monEntrepriseTelephones) {
          this.entreprise.monEntrepriseTelephones = [{}];
        }
        if (!this.entreprise.monEntrepriseEmails) {
          this.entreprise.monEntrepriseEmails = [{}];
        }
        this.toastr.success("Modification avec succès", "Succès")
      }, err => {
        this.toastr.error("Veuillez réessayer plutard.", "Echec")
        console.log(err);
      }
    );
  }

  deleteAdresse(i) {
    if (this.entreprise.monEntrepriseAdresses[i].idAdresse) {
      this.entServ.deleteTelAdresseEmail("adresse", this.entreprise.monEntrepriseAdresses[i].idAdresse).subscribe(
        (res) => {
          this.entreprise.monEntrepriseAdresses.splice(i, 1);
          if (i == 0 && this.entreprise.monEntrepriseAdresses.length == 0) {
            this.entreprise.monEntrepriseAdresses.push({
              idEnt: this.entreprise.idEnt
            });
          }
        }, err => {
          console.log(err);
        }
      );
    } else {
      this.entreprise.monEntrepriseAdresses.splice(i, 1);
      if (i == 0 && this.entreprise.monEntrepriseAdresses.length == 0) {
        this.entreprise.monEntrepriseAdresses.push({
          idEnt: this.entreprise.idEnt
        });
      }
    }
  }

  addAdresse() {
    this.entreprise.monEntrepriseAdresses.push({
      idEnt: this.entreprise.idEnt
    });
  }

  deleteTel(i) {
    if (this.entreprise.monEntrepriseTelephones[i].idTel) {
      this.entServ.deleteTelAdresseEmail("tel", this.entreprise.monEntrepriseTelephones[i].idTel).subscribe(
        (res) => {
          this.entreprise.monEntrepriseTelephones.splice(i, 1);
          if (i == 0 && this.entreprise.monEntrepriseTelephones.length == 0) {
            this.entreprise.monEntrepriseTelephones.push({
              idEnt: this.entreprise.idEnt
            });
          }
        }, err => {
          console.log(err);
        }
      );
    } else {
      this.entreprise.monEntrepriseTelephones.splice(i, 1);
      if (i == 0 && this.entreprise.monEntrepriseTelephones.length == 0) {
        this.entreprise.monEntrepriseTelephones.push({
          idEnt: this.entreprise.idEnt
        });
      }
    }

  }

  addTel() {
    this.entreprise.monEntrepriseTelephones.push({
      idEnt: this.entreprise.idEnt
    });
  }

  deleteEmail(i) {
    if (this.entreprise.monEntrepriseEmails[i].idEmail) {
      this.entServ.deleteTelAdresseEmail("email", this.entreprise.monEntrepriseEmails[i].idEmail).subscribe(
        (res) => {
          this.entreprise.monEntrepriseEmails.splice(i, 1);
          if (i == 0 && this.entreprise.monEntrepriseEmails.length == 0) {
            this.entreprise.monEntrepriseEmails.push({
              idEnt: this.entreprise.idEnt
            });
          }
        }, err => {
          console.log(err);
        }
      );
    } else {
      this.entreprise.monEntrepriseEmails.splice(i, 1);
      if (i == 0 && this.entreprise.monEntrepriseEmails.length == 0) {
        this.entreprise.monEntrepriseEmails.push({
          idEnt: this.entreprise.idEnt
        });
      }
    }

  }

  addEmail() {
    this.entreprise.monEntrepriseEmails.push({
      idEnt: this.entreprise.idEnt
    });
  }
}
