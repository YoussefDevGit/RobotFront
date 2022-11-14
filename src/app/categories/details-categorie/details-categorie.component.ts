import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categories, OptionsProduit } from 'src/app/models/Gestion.model';
import { DataService } from 'src/app/services/samad-services/data.services';
import { Url } from '../../services/variables.model';
@Component({
  selector: 'app-details-categorie',
  templateUrl: './details-categorie.component.html',
  styleUrls: ['./details-categorie.component.scss']
})
export class DetailsCategorieComponent implements OnInit {

  idCategorie;
  categorie: Categories = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataServ: DataService
  ) { }

  ngOnInit() {
    if (isNaN(this.route.snapshot.params.idCategorie)) {
      this.router.navigate(["categories"]);
      return false;
    }
    this.idCategorie = this.route.snapshot.params.idCategorie;
    this.getCategorieWithDetails();
  }

  // get all products of categories:
  getCategorieWithDetails() {
    this.dataServ.getCategorieWithDetails(this.idCategorie).subscribe(
      (res: Categories) => {
        if (!res) {
          this.router.navigate(["categories"]);
          return;
        }
        this.categorie = res;
      }, err => {
        this.router.navigate(["categories"]);
      }
    );
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

  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Produits/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }
}
