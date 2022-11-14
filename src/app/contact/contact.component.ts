import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ContactUs, MonEntreprise } from '../models/Gestion.model';
import { EntrepriseService } from '../services/samad-services/entreprise.services';
import { LoginService } from '../services/samad-services/login.services';

@Component({
  selector: 'll-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: ContactUs;
  constructor(
    private connServ: LoginService,
    private toastr: ToastrService,
    private entServ: EntrepriseService,
    private sanitizer: DomSanitizer
  ) { }

  initialiserContact() {
    this.contact = {};
  }
  ngOnInit(): void {
    this.getEntrepriseInfos();
    this.initialiserContact();
  }

  onSend;
  showError;
  showSucces;
  showErrorSend;
  SendMessage() {
    this.showError = false;
    this.showSucces = false;
    this.showErrorSend = false;

    if ((!this.contact.numTel && !this.contact.email) || !this.contact.nomComplet || !this.contact.message) {
      this.showError = true;
    }
    if ((this.contact.numTel || this.contact.email) && this.contact.nomComplet && this.contact.message) {
      this.onSend = true;
      this.toastr.clear();
      this.connServ.sendMessage(this.contact).subscribe(
        (succ: any) => {
          this.showError = false;
          this.showSucces = true;
          this.onSend = false;
          // this.toastr.success("Message envoyé avec succès", "Succès");
          this.initialiserContact();
        }, err => {
          this.onSend = false;
          this.showErrorSend = true;
        }
      )
    }
  }

  entreprise: MonEntreprise = { monEntrepriseTelephones: [{}], monEntrepriseAdresses: [{}] };
  getEntrepriseInfos() {
    this.entServ.getEntrepriseInfos_NT().subscribe(
      (res: MonEntreprise) => {
        this.entreprise = res;
        console.log(this.entreprise);
      }
    );
  }

  photoURL() {
    if (this.entreprise.postitionMaps)
      return this.sanitizer.bypassSecurityTrustUrl(this.entreprise.postitionMaps);
  }
}
