import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MyImage, Partenaires } from 'src/app/models/Traitement.model';
import { GestionService } from 'src/app/services/samad-services/gestion.services';
import { GlobalService } from 'src/app/services/samad-services/global.services';
import { Url } from 'src/app/services/variables.model';

@Component({
  selector: 'app-dashboard-partenaires',
  templateUrl: './dashboard-partenaires.component.html',
  styleUrls: ['./dashboard-partenaires.component.scss']
})
export class DashboardPartenairesComponent implements OnInit {

  newPart: Partenaires;
  upPart: Partenaires;
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
    this.GetAllPartenaires()
    this.initialiserPartenaire();
  }

  initialiserPartenaire() {
    this.newPart = {
      etat: true
    };
  }

  addNewPhotoPart(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.newPart.image = file.fileName;
    }
  }
  addUpPhotoPart(file) {
    // TODO : reload pictures
    if (file != "ERREUR") {
      this.upPart.image = file.fileName;
    }
  }

  PostPart() {
    if (!this.newPart.raisonSociale) {
      this.toastr.warning("Champs designation est obligatoire");
      return false;
    }
    if (!this.newPart.image) {
      this.toastr.warning("L'image est obligatoire");
      return false;
    }

    this.gestServ.PostPartenaire(this.newPart).subscribe(
      (succ: any) => {
        if (succ && succ.add) {
          this.toastr.success("Ajout avec succés");
          this.initialiserPartenaire();
          this.GetAllPartenaires();
        } else if (succ && !succ.add) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Cette raison sociale existe deja", "Erreur")
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

  UpdatePart() {
    if (!this.upPart.raisonSociale) {
      this.toastr.warning("Champs designation est obligatoire");
      return false;
    }
    if (!this.upPart.image) {
      this.toastr.warning("L'image est obligatoire");
      return false;
    }

    this.gestServ.PutPartenaire(this.upPart).subscribe(
      (succ: any) => {
        console.log(succ);
        if (succ && succ.up) {
          this.toastr.success("Modifictaion avec succès");
          this.remplirPart(succ.part);
        } else if (succ && !succ.up) {
          if (succ.message == "EXISTE_DEJA")
            this.toastr.error("Cette raison sociale existe deja", "Erreur")
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

  upDateEtatPart(part: Partenaires) {
    let putPart: Partenaires = {
      idPart: part.idPart,
      etat: part.etat
    }
    this.gestServ.PutPartenaireEtat(putPart).subscribe(
      (succ: any) => {
        this.toastr.success("État modifié");
        // this.GetAllPartenaires();
      }, err => {
        part.etat = !part.etat;
        console.error(err);
        this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
          () => {
            this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
          }, err => {
            this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
          });
      });
  }

  DeletePart(part: Partenaires) {
    if (confirm("Voulez vous vraiment supprimer ce partenaire?")) {
      this.gestServ.DeletePartenaire(part.idPart).subscribe(
        (succ: any) => {
          this.toastr.success("Suppression terminée");
          this.GetAllPartenaires();
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

  remplirPart(part) {
    this.upPart = JSON.parse(JSON.stringify(part));
  }

  InitialiserForm() {
    this.initialiserPartenaire();
  }



  allParts: Partenaires[];
  GetAllPartenaires() {
    this.gestServ.GetAllPartenaires().subscribe(
      (res: Partenaires[]) => {
        this.allParts = res;
        console.log(this.allParts);
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

  @ViewChild('update_part') callAPIDialog: TemplateRef<any>;
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "auto";
    const dialogRef = this.dialog.open(this.callAPIDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.GetAllPartenaires();
      this.initialiserPartenaire();
    })
  }



  GetImage(path: string) {
    return Url + "/Resources/Media/Photos/Partenaires/" + path;
  }

  GetErrorImage(img) {
    img.onerror = null;
    img.target.src = "/assets/images/err_img_1.svg";
  }

  deleteImageNewPart(path) {
    let img: MyImage = {
      path: "Resources/Media/Photos/Partenaires",
      name: path
    }
    this.globServ.deletePicture(img).subscribe(
      res => {
        this.newPart.image = "";
      }, err => {
        console.log(err);
      }
    );
  }
  deleteImageUpPart() {
    this.upPart.image = "";
  }
}
