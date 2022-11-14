import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { GestionService } from 'src/app/services/samad-services/gestion.services';
import { GlobalService } from 'src/app/services/samad-services/global.services';
import { Url } from 'src/app/services/variables.model';
import { Produits, Projets } from 'src/app/models/Gestion.model';
import { ApplicationsProduit } from 'src/app/models/Gestion.model';
import { MyImage } from 'src/app/models/Traitement.model';


@Component({
  selector: 'app-Dashboard-projet',
  templateUrl: './Dashboard-projet.component.html',
  styleUrls: ['./Dashboard-projet.component.scss']
})
export class DashboardProjetComponent implements OnInit {

  newProjet: Projets;
  upProjet: Projets;
  prod: Produits;
  appProd: ApplicationsProduit;
  list_prod: any[];
  ligne
  constructor(
    private toastr: ToastrService,
    private globServ: GlobalService,
    private gestServ: GestionService,
    // private modalService: NgbModal
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      order: [[0, "desc"]]
    };
    this.getAllProjects();
    this.initialiserProjet();
  }

  initialiserProjet() {
    this.newProjet = {
      photosProjet: []
    };
    this.GetAllTitresProduits();
  }

  InitialiserForm() {
    this.initialiserProjet();
  }

  allProd: Produits[] = [];
  GetAllTitresProduits() {
    this.gestServ.GetAllTitresProduits().subscribe(
      (res: Produits[]) => {
        this.allProd = res;
        this.newProjet.applicationsProduit = [{}]
        //console.log(this.allProd);
      });
  }

  getOptionProd(i, prod) {
    this.gestServ.GetAllTitresProduits().subscribe(
      (res: Produits[]) => {
        prod.options = prod;
        // this.allProd = res;
        // this.reloadTable();
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

  PostProjet() {
    if (!this.newProjet.libelle) {
      this.toastr.warning("Champs libellé est obligatoire");
      return false;
    } else if (!this.newProjet.description) {
      this.toastr.warning("Champs description est obligatoire");
      return false;
    } else if (!this.newProjet.applicationsProduit) {
      this.toastr.warning("Veuillez choisir les articles utilisés dans ce projet");
      return false;
    }

    // Traitement :
    let projToPost: Projets = {
      idProjet: this.newProjet.idProjet,
      libelle: this.newProjet.libelle,
      description: this.newProjet.description,
      photosProjet: this.newProjet.photosProjet,
      applicationsProduit: this.newProjet.applicationsProduit.slice().map(o => {
        return {
          idOptionProduit: o.idOptionProduit,
          quantite: o.quantite
        }
      })
    }
    // console.log(projToPost);

    this.gestServ.PostProjet(projToPost).subscribe(
      (succ: any) => {
        if (succ && succ.add) {
          this.toastr.success("Ajout avec succés");
          this.initialiserProjet();
          this.getAllProjects();
        } else if (succ && !succ.add) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Ce nom est déja utilisé", "Erreur")
        }
      }, err => {
        // console.log(err);
        this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
          () => {
            this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
          }, err => {
            this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
          });
      });
  }


  RemplirProjet(proj: Projets) {
    this.upProjet = JSON.parse(JSON.stringify(proj));
    this.upProjet.applicationsProduit.forEach(p => {
      p.idProjet = proj.idProjet;
      // p.produit = {
      //   idProduit: p.idOptionProduitNavigation.idProduitNavigation.idProduit,
      //   designation: p.idOptionProduitNavigation.idProduitNavigation.designation
      // }
      p.desabled = true;
      p.produit = this.allProd.find(pp => pp.idProduit == p.idOptionProduitNavigation.idProduit);
      //console.log(this.allProd.find(pp => pp.idProduit == p.idOptionProduitNavigation.idProduit));
    });
    console.log(this.upProjet);
  }

  PutProjet() {
    if (!this.upProjet.libelle) {
      this.toastr.warning("Champs libellé est obligatoire");
      return false;
    } else if (!this.upProjet.description) {
      this.toastr.warning("Champs description est obligatoire");
      return false;
    } else if (!this.upProjet.applicationsProduit) {
      this.toastr.warning("Veuillez choisir les articles utilisés dans ce projet");
      return false;
    }

    // Traitement :
    let projToPut: Projets = {
      idProjet: this.upProjet.idProjet,
      libelle: this.upProjet.libelle,
      description: this.upProjet.description,
      photosProjet: this.upProjet.photosProjet,
      applicationsProduit: this.upProjet.applicationsProduit.slice().map(o => {
        return {
          idOptionProduit: o.idOptionProduit,
          quantite: o.quantite,
          idProjet: o.idProjet
        }
      })
    }
    // console.log(projToPost);

    this.gestServ.PutProjet(projToPut).subscribe(
      (succ: any) => {
        if (succ && succ.del) {
          this.toastr.success("Ajout avec succés");
          this.RemplirProjet(succ.proj);
          this.getAllProjects();
        } else if (succ && !succ.del) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Ce nom est déja utilisé", "Erreur")
        }
      }, err => {
        // console.log(err);
        this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
          () => {
            this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
          }, err => {
            this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
          });
      });
  }

  DeleteProjet(proj: Projets) {
    if (confirm("Voulez vous vraiment supprimer ce projet ?")) {
      this.gestServ.DeletetProjet(proj.idProjet).subscribe(
        (succ: any) => {
          if (succ && succ.del) {
            this.toastr.success("Suppression terminée");
            this.getAllProjects();
          } else if (succ && !succ.del) {
            if (succ.message == "NOT_EXISTE") {
              this.toastr.error("Ce projet n'existe pas", "Echéc");
              this.getAllProjects();
            }
          }
        }, err => {
          // console.error(err);
          this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
            () => {
              this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
            }, err => {
              this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
            });
        });
    }
  }

  AddProduit() {
    this.newProjet.applicationsProduit.push({});
  }

  DeleteProduit(i) {
    this.newProjet.applicationsProduit.splice(i, 1);
    if (i <= 0 && this.newProjet.applicationsProduit.length <= 0) {
      this.AddProduit();
    }
  }

  AddProduitUp() {
    this.upProjet.applicationsProduit.push({});
  }

  DeleteProduitUp(i) {
    if (this.upProjet.applicationsProduit[i].desabled) {
      if (confirm("Voulez-vous vraiment supprimer cette option ?")) {
        this.gestServ.DeleteApplicationProduit(this.upProjet.idProjet, this.upProjet.applicationsProduit[i].idOptionProduit).subscribe(
          (res: any) => {
            if (res) {
              if (res.del) {
                this.toastr.success("Suppression términée", "Succès");
                this.upProjet.applicationsProduit.splice(i, 1);
                if (i <= 0 && this.upProjet.applicationsProduit.length <= 0) {
                  this.AddProduit();
                }
              } else if (res.message == "NOT_EXISTE") {
                this.toastr.error("Cette option n'existe pas", "Erreur");
              }
            }
          }, err => {
            console.log(err);
          }
        );
      }
    } else {
      this.upProjet.applicationsProduit.splice(i, 1);
      if (i <= 0 && this.upProjet.applicationsProduit.length <= 0) {
        this.AddProduit();
      }
    }
  }

  allProjets: Projets[];
  getAllProjects() {
    this.gestServ.getAllProjects().subscribe(
      (res: Projets[]) => {
        this.allProjets = res;
        this.reloadTable();
      }
    );
  }

  addNewPhotoProd(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.newProjet.photosProjet.push({
        path: file.fileName
      })
    }
  }
  addUpPhotoProd(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.upProjet.photosProjet.push({
        path: file.fileName
      })
    }
  }

  @ViewChild('update_proj') callAPIDialog: TemplateRef<any>;
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "auto";
    const dialogRef = this.dialog.open(this.callAPIDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.getAllProjects();
      this.initialiserProjet();
    })
  }



  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Projets/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  deleteImageNewProd(path) {
    let img: MyImage = {
      path: "Resources/Media/Photos/Projets",
      name: path
    }
    this.globServ.deletePicture(img).subscribe(
      res => {
        this.upProjet.photosProjet.splice(this.upProjet.photosProjet.findIndex(f => f.path == path), 1);
      }, err => {
        console.log(err);
      }
    );
  }
  deleteImageUpProd(path) {
    // let img: MyImage = {
    //   path: "Resources/Media/Photos/Projets",
    //   name: path
    // }
    // this.globServ.deletePicture(img).subscribe(
    //   res => {
    //     this.upProjet.photosProjet.splice(this.upProjet.photosProjet.findIndex(f => f.path == path), 1);
    //   }, err => {
    //     console.log(err);
    //   }
    // );
    this.upProjet.photosProjet.splice(this.upProjet.photosProjet.findIndex(f => f.path == path), 1);
  }
}