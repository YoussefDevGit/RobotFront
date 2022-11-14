import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commandes, OptionsProduit, Produits } from 'src/app/models/Gestion.model';
import { Panier, ProduitPanier } from 'src/app/models/Traitement.model';
import { MyPanierService } from 'src/app/services/my-panier.service';
import { DataService } from 'src/app/services/samad-services/data.services';
import { CommandeService } from 'src/app/services/ussef-services/commande.services';
import { Url } from 'src/app/services/variables.model';
import { menuList as staticMenuList } from '../../data/menus';
import * as cart from './script-addToCart';

@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList = [];
  isLessThenLargeDevice;
  panierProd;
  hover;
  prodsPanier: ProduitPanier;
  prod: Produits = {};
  idProduit;
  thumbsSwiper: any;
  // panier: Panier = { produits: [], infosLivraison: {} };

  // prodCat: Produits[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    public myPanier: MyPanierService,
    private toastr: ToastrService,
    private commServ: CommandeService) {
    // if (localStorage.getItem("panier")) {
    //   this.panier = JSON.parse(localStorage.getItem("panier"));
    // }
    // if (!this.panier.infosLivraison) {
    //   this.panier.infosLivraison = {};
    // }
  }

  ngOnInit(): void {
    this.panierProd = this.myPanier.panier.produits.length;
    this.menuList = staticMenuList;
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
    // console.log(this.myPanier.panier);
    // $("body").on("click", (event) => {
    //   if (event.target.id == "btn_shart") {
    //     console.log("hiii");
    //     this.ToggleSidebar('myDIV1');
    //   }
    //   else if ($(event.target).closest('#btn_shart').length) {
    //     this.ToggleSidebar('myDIV1');

    //   } else
    //     this.closeSidebar();
    // })
  }


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }

  // GetNbrProdPanier() {
  //   return this.myPanier.panier.produits.length;
  // }

  GetImageProduit(path: string) {
    return Url + "/Resources/Media/Photos/Produits/" + path;
  }
  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  ToggleSidebar(id) {
    if (id == "myDIV2" && this.myPanier.panier.produits.length <= 0) {
      this.toastr.warning("Le panier est vide.");
      return;
    }
    if (id == "myDIV1" || (id == "myDIV2" && this.myPanier.panier.produits.length > 0)) {
      cart.ToggleSidebar(id);
      return;
    }
    if (id == "myDIV3") {
      if (this.myPanier.panier.produits.length <= 0) {
        this.toastr.warning("Veuillez remplir votre panier.", "Attention", { timeOut: 1500 });
        return false;
      }
      if (!this.myPanier.CheckInfosLivarison()) {
        this.toastr.warning("Veuillez remplir toutes les cases.", "Attention", { timeOut: 1500 });
        return false;
      }
      this.checkout(id);
      return;
    }
  }

  ReturnSideBar() {
    cart.ReturnSideBar();
  }

  OpenPnier() {
    cart.OpenPnier();
  }

  closeSidebar() {
    cart.closeSidebar();
  }

  closeAll() {
    cart.closeAll();
  }
  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Produits/" + path;
  }

  reduceQte(i, item: ProduitPanier) {
    if (this.myPanier.panier.produits[i].quantite > 0) {
      this.myPanier.panier.produits[i].quantite--;
      this.myPanier.upDatePanier();
      if (!this.myPanier.panier.produits[i].quantite) {
        setTimeout(() => {
          if (this.myPanier.panier.produits.some(p => p.idOptionProd == item.idOptionProd && p.quantite == 0)) {
            this.myPanier.panier.produits.splice(this.myPanier.panier.produits.findIndex(p => p.idOptionProd == item.idOptionProd), 1);
            this.myPanier.upDatePanier();
          }
        }, 7000);
      }
    }
  }
  addQte(i) {
    this.myPanier.panier.produits[i].quantite++;
    this.myPanier.upDatePanier();
  }

  deleteProd(i) {
    this.myPanier.panier.produits.splice(i, 1);
    this.myPanier.upDatePanier();
  }

  ViderPanier() {
    this.myPanier.panier.produits = [];
    this.myPanier.initialiserPanier();
  }

  getSomme() {
    return this.myPanier.panier.produits.reduce((a, b) => a + (b.quantite * b.prixUnitaire), 0);
  }

  onsub;
  checkout(id) {
    this.onsub = true;
    setTimeout(() => {
      let commande: Commandes = {
        etatCommande: "INITIALE",
        coutLivraison: this.getSomme(),
        idLivraisonNavigation: this.myPanier.panier.infosLivraison,
        detailsCommande: this.myPanier.panier.produits.filter(p => p.quantite > 0).map(p => {
          return {
            idOpProduit: p.idOptionProd,
            quantite: p.quantite,
            prixUnitaire: p.prixUnitaire
          }
        })
      };
      this.myPanier.upDatePanier();
      this.commServ.PostCommande(commande).subscribe(
        res => {
          this.onsub = false;
          // this.toastr.success("Commande terminer avec succes");
          cart.ToggleSidebar(id);
          this.ViderPanier();
          // this.router.navigate(["/"]);
        },
        err => {
          this.onsub = false;
          console.log(err);
          this.toastr.warning("un erreur est produit , veuillez ressayer plutard.");
        }
      );
    }, 5000);
  }
}
