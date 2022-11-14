import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationsProduit, Commandes, OptionsProduit, Produits, Projets } from '../../models/Gestion.model';
import { DataService } from '../../services/samad-services/data.services';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { Url } from '../../services/variables.model';
import { Panier, ProduitPanier } from 'src/app/models/Traitement.model';
import { MyPanierService } from 'src/app/services/my-panier.service';
import { ToastrService } from 'ngx-toastr';
import { CommandeService } from '../../services/ussef-services/commande.services';

@Component({
  selector: 'app-panier-details',
  templateUrl: './panier-details.component.html',
  styleUrls: ['./panier-details.component.scss']
})
export class PanierDetailsComponent implements OnInit {
  prodsPanier: ProduitPanier;
  prod: Produits = {};
  idProduit;
  thumbsSwiper: any;
  panier: Panier = { produits: [], infosLivraison: {} };

  prodCat: Produits[] = [];

  constructor(
    private dataServ: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private myPanier: MyPanierService,
    private toastr: ToastrService,
    private commServ: CommandeService
  ) {
    if (localStorage.getItem("panier")) {
      this.panier = JSON.parse(localStorage.getItem("panier"));
    }
    if (!this.panier.infosLivraison) {
      this.panier.infosLivraison = {};
    }
  }
  ngOnInit() {
    console.log(this.panier);
  }
  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Produits/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  ViderPanier() {
    this.panier.produits = [];
    localStorage.removeItem("panier");
    this.myPanier.initialiserPanier();
  }

  getSomme() {
    return this.panier.produits.reduce((a, b) => a + (b.quantite * b.prixUnitaire), 0);
  }

  checkout() {
    if (this.panier.produits.length <= 0) {
      this.toastr.warning("Veuillez remplir votre panier.");
      return false;
    }
    if (!this.panier.infosLivraison.nomComplet || !this.panier.infosLivraison.adresse || !this.panier.infosLivraison.email || !this.panier.infosLivraison.numTel || !this.panier.infosLivraison.codePostal || !this.panier.infosLivraison.ville) {
      this.toastr.warning("Veuillez remplir tous les cases.");
      return false;
    }
    let commande: Commandes = {
      etatCommande: "INITIALE",
      coutLivraison: this.getSomme(),
      idLivraisonNavigation: this.panier.infosLivraison,
      detailsCommande: this.panier.produits.map(p => {
        return {
          idOpProduit: p.idOptionProd,
          quantite: p.quantite,
          prixUnitaire: p.prixUnitaire
        }
      })
    };
    this.commServ.PostCommande(commande).subscribe(
      res => {
        this.toastr.success("Commande terminer avec succes");
        this.ViderPanier();
        this.router.navigate(["/"]);
      },
      err => {
        this.toastr.warning("un erreur est produit , veuillez ressayer plutard.");
      }
    );
  }
}
