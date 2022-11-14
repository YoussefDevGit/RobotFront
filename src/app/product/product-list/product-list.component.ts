import { Component, OnInit } from '@angular/core';
import { Categories, OptionsProduit, Produits } from 'src/app/models/Gestion.model';
import { DataService } from 'src/app/services/samad-services/data.services';
import { productsDB } from '../../shared/data/products';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Url } from '../../services/variables.model';
import { Rechercher } from 'src/app/models/Traitement.model';

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isCatsLoaded;
  isProdsLoaded;
  prodFound;
  onCherch;
  rech: Rechercher = {};
  categories: Categories[] = [];
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  constructor(
    private dataServ: DataService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getNbrCategoriesWithSomeProds();
  }

  getNbrCategoriesWithSomeProds() {
    this.dataServ.getNbrCategoriesWithSomeProds(5).subscribe(
      (res: Categories[]) => {
        this.categories = res;
        this.isCatsLoaded = true;
      }
    );
  }

  produits: Produits[] = [];
  getProducts() {
    if (!this.advanceSearchExpanded) {
      this.rech.categorie = { idCategorie: 0 };
    }
    if (this.rech.rech) {
      this.onCherch = true;
      this.isProdsLoaded = false;
      this.prodFound = false;
      this.dataServ.ChercherProducts(this.rech).subscribe(
        (res: Produits[]) => {
          this.onCherch = false;
          this.isProdsLoaded = true;
          this.produits = res;
          this.prodFound = res.length > 0 ? true : false;
          console.log(this.prodFound, this.produits);
        }, err => {
          this.onCherch = false;
          this.isProdsLoaded = true;
          this.prodFound = false;
        }
      )
    }
  }

  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/produits/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  listCategories: Categories[] = [];
  getCategories() {
    this.dataServ.GetAllTitresCategories_NT().subscribe(
      (res: Categories[]) => {
        this.listCategories = res;
      }
    )
  }

  GetPrices(ops: OptionsProduit[]) {
    if (ops) {
      if (ops.length > 1) {
        ops.sort((a, b) => a.prixUnitaire - b.prixUnitaire);
        if (ops[0].prixUnitaire == ops[ops.length - 1].prixUnitaire) {
          return ops[0].prixUnitaire + " MAD";
        }
        return ops[0].prixUnitaire + "-" + ops[ops.length - 1].prixUnitaire + " MAD";
      } else if (ops.length == 1) {
        return ops[0].prixUnitaire + " MAD";
      } else {
        return "-";
      }
    }
  }
}
