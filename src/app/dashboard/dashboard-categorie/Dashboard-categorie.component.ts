import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Categories } from 'src/app/models/Gestion.model'
import { InfosImage, MyImage } from 'src/app/models/Traitement.model';
import { GestionService } from 'src/app/services/samad-services/gestion.services';
import { GlobalService } from 'src/app/services/samad-services/global.services';
import { Url } from 'src/app/services/variables.model';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Dashboard-categorie',
  templateUrl: './Dashboard-categorie.component.html',
  styleUrls: ['./Dashboard-categorie.component.scss']
})
export class DashboardCategorieComponent implements OnInit {

  newCat: Categories;
  upCat: Categories;
  listNewImages: InfosImage[];
  listUpImages: InfosImage[];

  constructor(
    private toastr: ToastrService,
    private globServ: GlobalService,
    private gestServ: GestionService,
    // private modalService: NgbModal
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      order: [[0, "desc"]]
    };
    this.initialiserCategorie();
    this.GetAllDetailsCategories();
  }

  initialiserCategorie() {
    this.newCat = {};
    this.upCat = {};
  }

  InitialiserForm() {
    this.initialiserCategorie();
  }


  addNewPhoto(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.newCat.path = file.fileName;
    }
  }

  addUpPhoto(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.upCat.path = file.fileName;
    }
  }
  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Categories/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  PostCategorie() {
    if (!this.newCat.libelle) {
      this.toastr.warning("Champ libellé est obligatoire");
      return false;
    }
    if (!this.newCat.path) {
      this.toastr.warning("Veuillez choisi une photo pour la catégorie");
      return false;
    }
    // Traitement :
    this.gestServ.PostCategorie(this.newCat).subscribe(
      (succ: any) => {
        if (succ && succ.add) {
          this.toastr.success("Ajout avec succés");
          this.initialiserCategorie();
          this.GetAllDetailsCategories();
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

  UpdateCategorie() {
    if (!this.upCat.libelle) {
      this.toastr.warning("Champ libellé est obligatoire");
      return false;
    }
    if (!this.upCat.path) {
      this.toastr.warning("Veuillez choisi une photo pour la catégorie");
      return false;
    }
    // Traitement :
    this.gestServ.PutCategorie(this.upCat).subscribe(
      (succ: any) => {
        if (succ && succ.up) {
          this.toastr.success("Modification avec succés");
          this.GetAllDetailsCategories();
          this.dialog.closeAll();
        } else if (succ && !succ.up) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Ce nom est déja utilisé", "Erreur")
          else if (succ.message == "CATEGORIE_INTROUVABLE")
            this.toastr.error("Cet catégorie n'existe pas", "Erreur")
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

  DeleteCategorie(cat) {
    if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      this.gestServ.DeleteCategorie(cat.idCategorie).subscribe(
        (succ: any) => {
          if (succ && succ.del) {
            this.toastr.success("Suppression avec succès");
            this.GetAllDetailsCategories();
          } else if (succ && !succ.del) {
            if (succ.message == "CATEGORIE_INTROUVABLE")
              this.toastr.error("cette catégorie n'existe pas", "Erreur")
            if (succ.message == "FOREIGN_KEY") {
              this.toastr.warning("Cette catégorie est utilisée par des produits", "Erreur")
            }
          }
        }, err => {
          this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
            () => {
              this.toastr.warning("Veuillez réessayer plutard", "Erreur")
            }, err => {
              this.toastr.warning("Veuillez vérifier la connexion internet, puis réessayer", "Erreur")
            });
        });
    }
  }
  remplirCategorie(item) {
    this.upCat = { ...item };
    console.log(this.upCat);
  }

  allCategories: Categories[] = [];
  GetAllDetailsCategories() {
    this.gestServ.GetAllDetailsCategories().subscribe(
      (res: Categories[]) => {
        this.allCategories = res;
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

  @ViewChild('update_cat') callAPIDialog: TemplateRef<any>;
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    dialogConfig.height = "auto";
    this.dialog.open(this.callAPIDialog, dialogConfig);
  }

  deleteImageNewSlide(path) {
    let img: MyImage = {
      path: "Resources/Media/Photos/Categories",
      name: path
    }
    this.globServ.deletePicture(img).subscribe(
      res => {
        this.newCat.path = "";
      }, err => {
        console.log(err);
      }
    );
  }

  deleteImageUpSlide() {
    this.upCat.path = "";
  }
}
