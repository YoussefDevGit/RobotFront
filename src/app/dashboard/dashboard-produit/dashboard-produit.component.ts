import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Categories, Produits, TypeProduit } from 'src/app/models/Gestion.model';
import { InfosImage, MyImage } from 'src/app/models/Traitement.model';
import { EntrepriseService } from 'src/app/services/samad-services/entreprise.services';
import { GestionService } from 'src/app/services/samad-services/gestion.services';
import { GlobalService } from 'src/app/services/samad-services/global.services';
import { Url } from 'src/app/services/variables.model';

@Component({
  selector: 'app-dashboard-produit',
  templateUrl: './dashboard-produit.component.html',
  styleUrls: ['./dashboard-produit.component.scss']
})
export class DashboardProduitComponent implements OnInit {
  selected = new FormControl(0);
  upSelected = new FormControl(0);

  newProd: Produits;
  upProd: Produits;
  //idType;
  libType;
  constructor(
    private gestServ: GestionService,
    private globServ: GlobalService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      order: [[0, 'desc']]
    };
    this.GetAllDetailsProduits()
    this.initialiserProduit();
    this.getTypesProduit();
    this.getCategories();
  }

  initialiserProduit() {
    this.libType = null;
    this.newProd = {
      photosProduit: [],
      categoriesProduit: [],
      optionsProduit: [{
      }]
    };
    this.selected.setValue(0);
  }
  typesProduit: TypeProduit[] = [];
  copyListProduit: TypeProduit[] = [];
  getTypesProduit() {
    // TODO
    this.gestServ.GetAllTitresTypesProd().subscribe(
      (res: TypeProduit[]) => {
        this.typesProduit = res;
        this.copyListProduit = this.typesProduit.slice();
      }
    )
  }

  listCategories: Categories[] = [];
  getCategories() {
    // TODO
    this.gestServ.GetAllTitresCategories().subscribe(
      (res: Categories[]) => {
        this.listCategories = res;
      }
    )
  }

  filtrer(e) {
    this.typesProduit = this.copyListProduit.slice().filter(t => t.libelle.toLowerCase().includes(e.toLowerCase() ?? ""));
  }

  //ListPhotos: InfosImage[] = [];
  addNewPhotoProd(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.newProd.photosProduit.push({
        path: file.fileName
      })
    }
  }
  addUpPhotoProd(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.upProd.photosProduit.push({
        path: file.fileName
      })
    }
  }

  //ListPhotos: InfosImage[] = [];
  addNewPhotoOpProd(file, i) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      // this.newProd.photosProduit.push({
      //   path: file.fileName
      // })
      this.newProd.optionsProduit[i].pathPhotoOpProd = file.fileName;
    }
  }
  //ListPhotos: InfosImage[] = [];
  addUpPhotoOpProd(file, i) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      // this.newProd.photosProduit.push({
      //   path: file.fileName
      // })
      this.upProd.optionsProduit[i].pathPhotoOpProd = file.fileName;
    }
  }

  addVariante() {
    this.newProd.optionsProduit.push({
    });
    this.selected.setValue(this.newProd.optionsProduit.length - 1);
  }
  deleteVariante(i) {
    if (this.newProd.optionsProduit.length > 1) {
      this.newProd.optionsProduit.splice(i, 1);
    }
    if (this.selected.value == i) {
      if (i > 0) {
        this.selected.setValue(i - 1);
      } else if (i == 0) {
        this.selected.setValue(i - 1);
      }
    }
  }

  PostProduit() {
    if (!this.newProd.designation) {
      this.toastr.warning("Champs designation est obligatoire");
      return false;
    }
    if (this.newProd.photosProduit.length <= 0) {
      this.toastr.warning("Veuillez choisi une photo pour le produit");
      return false;
    }
    // Traitement :
    // categories :
    this.newProd.categoriesProduit = this.newProd.categoriesProduit.map(cat => {
      return {
        idCategorie: cat.idCategorie
      }
    });

    let type = this.typesProduit.find(t => t.libelle == this.libType)
    if (type && type[0]) {
      this.newProd.idType = type.idType;
    } else {
      this.newProd.idTypeNavigation = { libelle: this.libType };
    }
    this.gestServ.PostProduit(this.newProd).subscribe(
      (succ: any) => {
        if (succ && succ.add) {
          this.toastr.success("Ajout avec succés");
          this.initialiserProduit();
          this.GetAllDetailsProduits();
          this.getTypesProduit();
        } else if (succ && !succ.add) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Ce nom est déja utilisé", "Erreur")
        }
      }, err => {
        this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
          () => {
            this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
          }, err => {
            this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
          });
      });
  }

  UpdateProduit() {
    if (!this.upProd.designation) {
      this.toastr.warning("Champs designation est obligatoire");
      return false;
    }
    if (this.upProd.photosProduit.length <= 0) {
      this.toastr.warning("Veuillez choisi une photo pour le produit");
      return false;
    }
    // Traitement :
    // categories :
    this.upProd.categoriesProduit = this.upProd.categoriesProduit.map(cat => {
      return {
        idCategorie: cat.idCategorie,
        idProduit: this.upProd.idProduit
      }
    });

    let type = this.typesProduit.find(t => t.libelle == this.libType)
    if (type && type[0]) {
      this.upProd.idType = type.idType;
    } else {
      this.upProd.idTypeNavigation = { libelle: this.libType };
    }
    this.gestServ.PutProduit(this.upProd).subscribe(
      (succ: any) => {
        if (succ && succ.up) {
          this.toastr.success("Modifictaion avec succès");
          this.remplirProduit(succ.prod);
          // this.GetAllDetailsProduits();
          this.getTypesProduit();
        } else if (succ && !succ.up) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Ce nom est déja utilisé", "Erreur")
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

  DeleteProduit(prod: Produits) {
    if (confirm("Voulez vous vraiment supprimer ce produit ?")) {
      this.gestServ.DeleteProduit(prod.idProduit).subscribe(
        (succ: any) => {
          if (succ && succ.del) {
            this.toastr.success("Suppression terminée");
            this.GetAllDetailsProduits();
            this.getTypesProduit();
          } else if (succ && !succ.del) {
            if (succ.message == "NOT_EXISTE") {
              this.toastr.error("Ce produits n'existe pas", "Echéc");
              this.GetAllDetailsProduits();
            } else if (succ.message == "OPTION_UTILISEE_APPLICATION") {
              this.toastr.error("Certaines variantes de ce produit sont utilisées dans des projts, veuillez les supprimés depuis 'Gestion projets' et puis réessayer.", "Echéc", { timeOut: 6000 });
            } else if (succ.message == "OPTION_UTILISEE_COMMANDE") {
              this.toastr.toastrConfig
              this.toastr.error("Certaines variantes de ce produit sont utilisées dans des commandes, veuillez les supprimés depuis 'Gestion commandes' et puis réessayer.", "Echéc", { timeOut: 6000 });
            }

          }
        }, err => {
          console.error(err);
          this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
            () => {
              this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
            }, err => {
              this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
            });
        });
    }
  }
  addVarianteUp() {
    this.upProd.optionsProduit.push({
    });
    this.upSelected.setValue(this.upProd.optionsProduit.length - 1);
  }
  deleteOptionProduct(i) {
    if (this.upProd.optionsProduit[i].idOpProduit) {
      if (confirm("Voulez-vous vraiment supprimer cette option ?")) {
        this.gestServ.deleteOptionProduit(this.upProd.optionsProduit[i].idOpProduit).subscribe(
          (res: any) => {
            if (res) {
              if (res.del) {
                this.toastr.success("Suppression términée", "Succès");
                if (this.upProd.optionsProduit.length > 1) {
                  this.upProd.optionsProduit.splice(i, 1);
                }
                if (this.upSelected.value == i) {
                  if (i > 0) {
                    this.upSelected.setValue(i - 1);
                  } else if (i == 0) {
                    this.upSelected.setValue(i - 1);
                  }
                }
              } else if (res.message == "NOT_EXISTE") {
                this.toastr.error("Cette option n'existe pas", "Erreur");
              } else if (res.message == "FOREIGN_KEY") {
                this.toastr.error("Cette option est déja utilisée dans des projets ou des commandes", "Erreur");
              }

            }
          }, err => {
            console.log(err);
          }
        );
      }
    } else {
      if (this.upProd.optionsProduit.length > 1) {
        this.upProd.optionsProduit.splice(i, 1);
      }
      if (this.upSelected.value == i) {
        if (i > 0) {
          this.upSelected.setValue(i - 1);
        } else if (i == 0) {
          this.upSelected.setValue(i - 1);
        }
      }
    }
  }
  remplirProduit(prod) {
    this.upProd = JSON.parse(JSON.stringify(prod));
    this.libType = this.upProd.idTypeNavigation.libelle;
    this.upProd.categoriesProduit = this.listCategories.filter(c => this.upProd.categoriesProduit.some(o => o.idCategorie == c.idCategorie));
    this.upSelected.setValue(0);
  }

  InitialiserForm() {
    this.initialiserProduit();
  }



  allProduits: Produits[] = [];
  GetAllDetailsProduits() {
    this.gestServ.GetAllDetailsProduits().subscribe(
      (res: Produits[]) => {
        this.allProduits = res;
        // console.log(this.allProduits);
        this.reloadTable();
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

  @ViewChild('update_prod') callAPIDialog: TemplateRef<any>;
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "auto";
    const dialogRef = this.dialog.open(this.callAPIDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.GetAllDetailsProduits();
      this.initialiserProduit();
      this.getTypesProduit();
    })
  }



  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Produits/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  deleteImageNewProd(path) {
    let img: MyImage = {
      path: "Resources/Media/Photos/Produits",
      name: path
    }
    this.globServ.deletePicture(img).subscribe(
      res => {
        this.newProd.photosProduit.splice(this.newProd.photosProduit.findIndex(f => f.path == path), 1);
      }, err => {
        console.log(err);
      }
    );
  }
  deleteImageUpProd(path) {
    // let img: MyImage = {
    //   path: "Resources/Media/Photos/Produits",
    //   name: path
    // }
    // this.globServ.deletePicture(img).subscribe(
    //   res => {
    //     this.upProd.photosProduit.splice(this.upProd.photosProduit.findIndex(f => f.path == path), 1);
    //   }, err => {
    //     console.log(err);
    //   }
    // );
    this.upProd.photosProduit.splice(this.upProd.photosProduit.findIndex(f => f.path == path), 1);
  }
}
