import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationsProduit, OptionsProduit, Produits, Projets } from '../../models/Gestion.model';
import { DataService } from '../../services/samad-services/data.services';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { Url } from '../../services/variables.model';
import { Panier, ProduitPanier } from 'src/app/models/Traitement.model';
import { MyPanierService } from 'src/app/services/my-panier.service';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'll-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  prodsPanier: ProduitPanier;
  prod: Produits = {};
  idProduit;
  thumbsSwiper: any;
  // panier: Panier = { produits: [] };

  @ViewChild('swiperRef1', { static: false }) swiperRef1?: SwiperComponent;
  @ViewChild('swiperRef2', { static: false }) swiperRef2?: SwiperComponent;

  prodCat: Produits[] = [];

  constructor(
    private dataServ: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private myPanier: MyPanierService
  ) {
    // if (localStorage.getItem("panier")) {
    //   this.panier = JSON.parse(localStorage.getItem("panier"));
    // }
  }

  ngOnInit() {
    this.qteProd = 1;
    if (isNaN(this.route.snapshot.params.idProduit)) {
      this.router.navigate(["products"]);
    } else {
      this.idProduit = this.route.snapshot.params.idProduit;
      this.getProduitDetail();
    }
  }
  //getProduitDetails
  ConcatCategories;
  getProduitDetail() {
    this.dataServ.getProduitDetail(this.idProduit).subscribe(
      (res: Produits) => {
        if (res) {
          this.prod = res;
          this.getProdCategorie();
          this.SetDetails();
          if (this.prod.optionsProduit.length == 1) {
            this.selectedOptionProduct = this.prod.optionsProduit[0];
          }
          if (this.prod.categoriesProduit) {
            this.ConcatCategories = this.prod.categoriesProduit.map(o => o.idCategorieNavigation.libelle).join(", ");
          }

        } else {
          this.router.navigate(["products"]);
        }
      }
    );
  }

  isApps;
  listApps: Projets[] = [];
  listDetails: string[] = [];
  listSpec = "";
  SetDetails() {
    this.prod.optionsProduit.forEach(p => {
      if (p.description) {
        this.listDetails.push(p.description);
      }
      p.applicationsProduit.forEach(o => {
        if (!this.listApps.some(i => i.idProjet == o.idProjet)) {
          this.listApps.push({
            idProjet: o.idProjet,
            libelle: o.idProjetNavigation.libelle
          });
        }
      });
      if (p.pathPhotoOpProd) {
        this.prod.photosProduit.push({
          path: p.pathPhotoOpProd
        })
      }
    });

    this.listSpec = this.prod.optionsProduit.map(o => o.valeurType).join(", ");
  }

  qteProd;
  addQte() {
    this.qteProd++;
  }

  remQte() {
    if (this.qteProd > 1) {
      this.qteProd--;
    } else {
      this.qteProd = 1;
    }
  }

  checkQte(e: KeyboardEvent) {
    // console.log(e);
    if (isNaN(+e.key) && e.key != "Backspace") {
      return false;
    }
  }
  selectedOptionProduct: OptionsProduit;
  setSelectedOptionProduct(val: OptionsProduit) {
    this.selectedOptionProduct = val;
    let i = this.prod.photosProduit.findIndex(f => f.path == this.selectedOptionProduct.pathPhotoOpProd);
    if (i != -1) {
      this.slideTo(i);
    }
  }

  slideTo(index: number) {
    this.swiperRef1.swiperRef.slideTo(index - 1, 0);
    this.swiperRef2.swiperRef.slideTo(index - 1, 0);
  }

  added;
  invalidSelect;
  addToCart() {
    console.log(this.selectedOptionProduct);
    if (this.selectedOptionProduct) {
      let produitToAdd = {
        idOptionProd: this.selectedOptionProduct.idOpProduit,
        idProd: this.selectedOptionProduct.idProduit,
        libelle: this.prod.designation,
        type: this.prod.idTypeNavigation.libelle,
        option: this.selectedOptionProduct.valeurType,
        description: this.selectedOptionProduct.description,
        image: this.selectedOptionProduct.pathPhotoOpProd ?? this.prod.photosProduit[0].path,
        prixUnitaire: this.selectedOptionProduct.prixUnitaire,
        quantite: this.qteProd
      }
      if (this.myPanier.panier.produits.some(p => p.idOptionProd == produitToAdd.idOptionProd)) {
        this.myPanier.panier.produits.find(p => p.idOptionProd == produitToAdd.idOptionProd).quantite += produitToAdd.quantite;
        this.myPanier.panier.produits.find(p => p.idOptionProd == produitToAdd.idOptionProd).prixUnitaire = produitToAdd.prixUnitaire;
      } else {
        this.myPanier.panier.produits.push(produitToAdd);
      }
      this.invalidSelect = false;
      this.added = produitToAdd.libelle + ", " + produitToAdd.option;
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

  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Produits/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }
  GetPrices(ops: OptionsProduit[]) {
    if (ops) {
      if (ops.length > 1) {
        ops.sort((a, b) => a.prixUnitaire - b.prixUnitaire);
        return ops[0].prixUnitaire + "-" + ops[ops.length - 1].prixUnitaire + " MAD";
      } else if (ops.length == 1) {
        return ops[0].prixUnitaire + "MAD";
      } else {
        return "-";
      }
    }
  }


  getProdCategorie() {
    this.dataServ.getProdCategorie(this.idProduit).subscribe(
      (res: Produits[]) => {
        this.prodCat = res;
        // console.log(this.prodCat);
      }
    );
  }

  redirectTo(uri: string[]) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(uri));
  }
}
