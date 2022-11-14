import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MyImage, SlidesAccueil } from 'src/app/models/Traitement.model';
import { GestionService } from 'src/app/services/samad-services/gestion.services';
import { GlobalService } from 'src/app/services/samad-services/global.services';
import { Url } from 'src/app/services/variables.model';

@Component({
  selector: 'app-dashboard-slides-accueil',
  templateUrl: './dashboard-slides-accueil.component.html',
  styleUrls: ['./dashboard-slides-accueil.component.scss']
})
export class DashboardSlidesAccueilComponent implements OnInit {


  newSlide: SlidesAccueil;

  upSlide: SlidesAccueil;
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
    this.GetAllSlides()
    this.initialiserSlide();
  }

  initialiserSlide() {
    this.newSlide = {
      etat: true
    };
  }

  //ListPhotos: InfosImage[] = [];
  addNewPhotoSlide(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.newSlide.image = file.fileName;
    }
  }
  addUpPhotoSlide(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.upSlide.image = file.fileName;
    }
  }

  PostSlide() {
    if (!this.newSlide.titre) {
      this.toastr.warning("Champs designation est obligatoire");
      return false;
    }
    if (!this.newSlide.image) {
      this.toastr.warning("L'image est obligatoire");
      return false;
    }

    this.gestServ.PostSlideAccueil(this.newSlide).subscribe(
      (succ: any) => {
        if (succ && succ.add) {
          this.toastr.success("Ajout avec succés");
          this.initialiserSlide();
          this.GetAllSlides();
        } else if (succ && !succ.add) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Cette slide existe deja", "Erreur")
        }
      }, err => {
        console.log(err);
        this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
          () => {
            this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
          }, err => {
            this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
          });
      });
  }

  UpdateSlide() {
    if (!this.upSlide.titre) {
      this.toastr.warning("Champs designation est obligatoire");
      return false;
    }
    if (!this.upSlide.image) {
      this.toastr.warning("L'image est obligatoire");
      return false;
    }

    this.gestServ.PutSlideAccueil(this.upSlide).subscribe(
      (succ: any) => {
        console.log(succ);
        if (succ && succ.up) {
          this.toastr.success("Modifictaion avec succès");
          this.remplirSlide(succ.slide);
        } else if (succ && !succ.up) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Cette slide existe deja", "Erreur")
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

  upDateEtatSlide(slide: SlidesAccueil) {
    let putSlide: SlidesAccueil = {
      idSlide: slide.idSlide,
      etat: slide.etat
    }
    this.gestServ.PutSlideAccueilEtat(putSlide).subscribe(
      (succ: any) => {
        this.toastr.success("État modifié");
      }, err => {
        slide.etat = !slide.etat;
        console.error(err);
        this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
          () => {
            this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
          }, err => {
            this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
          });
      });
  }

  DeleteSlide(slide: SlidesAccueil) {
    if (confirm("Voulez vous vraiment supprimer cette slide?")) {
      this.gestServ.DeleteSlideAccueil(slide.idSlide).subscribe(
        (succ: any) => {
          this.toastr.success("Suppression terminée");
          this.GetAllSlides();
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

  remplirSlide(slide) {
    this.upSlide = JSON.parse(JSON.stringify(slide));
  }

  InitialiserForm() {
    this.initialiserSlide();
  }



  allSlides: SlidesAccueil[];
  GetAllSlides() {
    this.gestServ.GetAllSlides().subscribe(
      (res: SlidesAccueil[]) => {
        this.allSlides = res;
        console.log(this.allSlides);
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

  @ViewChild('update_slide') callAPIDialog: TemplateRef<any>;
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "auto";
    const dialogRef = this.dialog.open(this.callAPIDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.GetAllSlides();
      this.initialiserSlide();
    })
  }



  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Slides/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  deleteImageNewSlide(path) {
    let img: MyImage = {
      path: "Resources/Media/Photos/Slides",
      name: path
    }
    this.globServ.deletePicture(img).subscribe(
      res => {
        this.newSlide.image = "";
      }, err => {
        console.log(err);
      }
    );
  }
  deleteImageUpSlide() {
    this.upSlide.image = "";
  }
}
