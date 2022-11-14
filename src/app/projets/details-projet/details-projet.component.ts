import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projets } from 'src/app/models/Gestion.model';
import { Panier, ProduitPanier } from 'src/app/models/Traitement.model';
import { MyPanierService } from 'src/app/services/my-panier.service';
import { DataService } from 'src/app/services/samad-services/data.services';
import { Url } from '../../services/variables.model';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.scss']
})
export class DetailsProjetComponent implements OnInit {

  idProjet;
  projet: Projets = {};
  produitsPanier: ProduitPanier[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataServ: DataService,
    private myPanier: MyPanierService
  ) {
    console.log(this.myPanier.panier);
  }

  ngOnInit() {
    if (isNaN(this.route.snapshot.params.idProjet)) {
      this.router.navigate(["projets"]);
      return false;
    }
    this.idProjet = this.route.snapshot.params.idProjet;
    this.getProjetWithDetails();
  }

  // get all products of categories:
  getProjetWithDetails() {
    this.dataServ.getProjetWithDetails(this.idProjet).subscribe(
      (res: Projets) => {
        // console.log(res)
        if (!res) {
          this.router.navigate(["projets"]);
          return;
        }
        this.projet = res;
        this.setProductPanier();
      }, err => {
        this.router.navigate(["projets"]);
      }
    );
  }

  setProductPanier() {
    this.produitsPanier = this.projet.applicationsProduit.map(p => {
      return {
        idOptionProd: p.idOptionProduit,
        idProd: p.idOptionProduitNavigation.idProduit,
        description: p.idOptionProduitNavigation.description,
        libelle: p.idOptionProduitNavigation.idProduitNavigation.designation,
        type: p.idOptionProduitNavigation.idProduitNavigation.idTypeNavigation.libelle,
        option: p.idOptionProduitNavigation.valeurType,
        quantite: p.quantite,
        image: p.idOptionProduitNavigation.pathPhotoOpProd ?? p.idOptionProduitNavigation.idProduitNavigation.photosProduit[0].path,
        prixUnitaire: p.idOptionProduitNavigation.prixUnitaire
      }
    });
  }
  addQuantite(opt: ProduitPanier) {
    opt.quantite++;
  }
  reduceQuantite(opt: ProduitPanier) {
    if (opt.quantite > 0) {
      opt.quantite--;
    }
  }


  setQuantiteZero(opt: ProduitPanier) {
    opt.quantite = 0;
  }

  getSomme() {
    return this.produitsPanier.reduce((a, b) => a + (b.quantite * b.prixUnitaire), 0);
  }

  added;
  invalidSelect;
  addToCart() {
    console.log(this.produitsPanier);
    if (this.produitsPanier.length > 0) {
      this.produitsPanier.forEach((pToAdd: ProduitPanier) => {
        if (this.myPanier.panier.produits.some(p => p.idOptionProd == pToAdd.idOptionProd)) {
          this.myPanier.panier.produits.find(p => p.idOptionProd == pToAdd.idOptionProd).quantite += pToAdd.quantite;
          this.myPanier.panier.produits.find(p => p.idOptionProd == pToAdd.idOptionProd).prixUnitaire = pToAdd.prixUnitaire;
        } else {
          this.myPanier.panier.produits.push(pToAdd);
        }
      });

      this.added = true;
      this.invalidSelect = false;
      localStorage.setItem("panier", JSON.stringify(this.myPanier.panier));
      setTimeout(
        () => this.added = false, 10000
      )
    } else {
      this.invalidSelect = true;
      setTimeout(
        () => this.invalidSelect = false, 5000
      )
    }
  }

  GetImageProduit(path: string) {
    return Url + "/Resources/Media/Photos/Produits/" + path;
  }
  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }
}
