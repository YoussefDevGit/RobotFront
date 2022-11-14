import { Component, OnInit } from '@angular/core';
import { ApplicationsProduit, Projets } from '../models/Gestion.model';
import { DataService } from '../services/samad-services/data.services';
import { Url } from '../services/variables.model';
@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit {

  projets: Projets[] = [];
  constructor(
    private dataServ: DataService
  ) { }

  ngOnInit(
  ) {
    this.getAllProjets();
  }


  getAllProjets() {
    this.dataServ.getAllProjets_NT().subscribe(
      (res: Projets[]) => {
        this.projets = res;
        // console.log(this.projets);
      }
    );
  }

  getListComposants(app: ApplicationsProduit[]) {
    if (app && app.length > 0) {
      let t = app.map(s => {
        return {
          designation: s.idOptionProduitNavigation.idProduitNavigation.designation,
          idProduit: s.idOptionProduitNavigation.idProduitNavigation.idProduit
        }
      });
      // console.log(t);
      return t;
    }
  }

  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Projets/" + path;
  }
  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }
}
