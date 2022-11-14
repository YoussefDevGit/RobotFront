import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Commandes, DetailsCommande, InfosLivraison } from 'src/app/models/Gestion.model';
import { InfosImage, MyImage } from 'src/app/models/Traitement.model';
import { CommandeService } from 'src/app/services/ussef-services/commande.services';
import { InfosService } from 'src/app/services/ussef-services/infosLivraison.services';
import { GlobalService } from 'src/app/services/samad-services/global.services';
import { Url } from 'src/app/services/variables.model';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private globServ: GlobalService,
    private comServ: CommandeService,
    private infoServ: InfosService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      order: [[0, 'desc']]
    };
    this.GetAllOrders();
  }

  listEtats = ['INITIALE', 'LIVRÉ', 'REJET', 'FINALE'];
  listVilles = [];
  selectedEtat = "tous_etats";
  selectedVille = "tous_villes";
  orders: Commandes[] = [];
  copyOrders: Commandes[];
  GetAllOrders() {
    this.comServ.GetAllOrders().subscribe(
      (res: Commandes[]) => {
        this.orders = res;
        this.copyOrders = res.slice();
        // this.listEtats = this.distinct(this.orders.map(p => p.etatCommande));
        this.listVilles = this.distinct(this.orders.map(p => p.idLivraisonNavigation.ville));
        this.reloadTable();
      }), err => {

      }
  }
  selectedEtatChange() {
    console.log(this.copyOrders);
    this.orders = this.copyOrders.filter(o => (o.etatCommande == this.selectedEtat || this.selectedEtat == 'tous_etats')
      && (o.idLivraisonNavigation.ville == this.selectedVille || this.selectedVille == 'tous_villes'));
    this.reloadTable();
  }
  distinct(t: string[]) {
    let tab = [];
    t.forEach(i => {
      if (!tab.some(ii => ii == i))
        tab.push(i);
    })
    return tab;
  }

  selectedCommande: Commandes = { idLivraisonNavigation: {}, detailsCommande: [] };

  GetSelectedOrder(idCommande) {
    this.comServ.GetSelectedOrder(idCommande).subscribe(
      (res: Commandes) => {
        this.selectedCommande = res;
      }), err => {

      }
  }


  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized: boolean = false;
  anim;

  reloadTable() {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
  }

  @ViewChild('show_comm') callAPIDialog: TemplateRef<any>;
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.height = "90%";
    this.dialog.open(this.callAPIDialog, dialogConfig);
  }

  GetTotale() {
    if (this.selectedCommande && this.selectedCommande.detailsCommande.length > 0) {
      return this.selectedCommande.detailsCommande.map(p => p.quantite * p.prixUnitaire).reduce((a, b) => a + b, 0);
    }
    return 0;
  }

  PutInfosLivraison() {
    console.log(this.selectedCommande);
    // if (this.selectedCommande.idCommande
    //   && this.selectedCommande.idLivraisonNavigation.nomComplet
    //   && this.selectedCommande.idLivraisonNavigation.numTel
    //   && this.selectedCommande.idLivraisonNavigation.ville
    //   && this.selectedCommande.idLivraisonNavigation.adresse
    //   && this.selectedCommande.idLivraisonNavigation.codePostal
    //   && this.selectedCommande.idLivraisonNavigation.email){
    this.infoServ.PutInfosLivraison(this.selectedCommande).subscribe(
      (res: InfosLivraison) => {
        //this.modalService.dismissAll();
        this.GetAllOrders();
        this.toastr.success("Modification avec succès");

      }, err => {
        console.log(err);
        if (err.error.message == "info_NULL") {
          this.toastr.error("Info Livraison null");
        } else {
          this.toastr.error("Veuillez Vérifier la connexion internet, puis réessayer", "Echéc");
        };
      }
    );
    // } else {
    //   this.toastr.error("Veuillez remplir toutes les cases")
    // }
  }
}
