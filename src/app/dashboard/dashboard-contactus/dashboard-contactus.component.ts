import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ContactUs } from 'src/app/models/Gestion.model';
import { GestionService } from 'src/app/services/samad-services/gestion.services';
import { GlobalService } from 'src/app/services/samad-services/global.services';

@Component({
  selector: 'app-dashboard-contactus',
  templateUrl: './dashboard-contactus.component.html',
  styleUrls: ['./dashboard-contactus.component.scss']
})
export class DashboardContactusComponent implements OnInit {

  contact: ContactUs;
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
      order: [[0, 'desc']]
    };
    this.GetAllMessages();
  }

  initialiserMessage() {
    this.contact = {};
  }

  onDel;
  DeleteCategorie(mssg: ContactUs) {
    this.onDel = true;
    if (confirm("Voulez-vous vraiment supprimer ce message ?")) {
      this.gestServ.DeleteMessage(mssg.idContact).subscribe(
        (succ: any) => {
          this.onDel = false;
          this.toastr.success("Suppression avec succès");
          this.GetAllMessages();
        }, err => this.onDel = false);
    }
  }

  remplirMessage(item) {
    this.contact = { ...item };
  }

  allMessages: ContactUs[] = [];
  GetAllMessages() {
    this.gestServ.GetAllMessages().subscribe(
      (res: ContactUs[]) => {
        this.allMessages = res;
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

  @ViewChild('showMessage') callAPIDialog: TemplateRef<any>;
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "auto";
    this.dialog.open(this.callAPIDialog, dialogConfig);
  }

  test() {
    alert("test")
  }
}
