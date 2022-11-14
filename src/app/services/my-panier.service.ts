import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Panier } from "../models/Traitement.model";

@Injectable()
export class MyPanierService {
  panier: Panier = { produits: [] };

  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    if (localStorage.getItem("panier")) {
      this.panier = JSON.parse(localStorage.getItem("panier"));
    }
    if (!this.panier.produits) {
      this.panier.produits = [];
    }

    if (!this.panier.infosLivraison) {
      this.panier.infosLivraison = {};
    }
    this.sidebarVisibilityChange.subscribe((panier) => {
      this.panier = panier as Panier;
      localStorage.setItem("panier", JSON.stringify(this.panier));
    });
  }

  upDatePanier() {
    localStorage.setItem("panier", JSON.stringify(this.panier));
  }

  initialiserPanier() {
    this.panier = {
      infosLivraison: {}, produits: []
    }
    this.upDatePanier();
  }
  getPriceTot() {
    if (this.panier && this.panier.produits) {
      let p = this.panier.produits.map(p => p.quantite * p.prixUnitaire).reduce((a, b) => a + b, 0);
      //console.log(p);
      return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return false;
  }

  toggleSidebarVisibility() {
    this.sidebarVisibilityChange.next(!this.panier);
  }

  CheckInfosLivarison() {
    return this.panier.infosLivraison.nomComplet
      // && this.panier.infosLivraison.adresse
      // && this.panier.infosLivraison.email
      && this.panier.infosLivraison.numTel
      // && this.panier.infosLivraison.codePostal
      && this.panier.infosLivraison.ville;
  }
}