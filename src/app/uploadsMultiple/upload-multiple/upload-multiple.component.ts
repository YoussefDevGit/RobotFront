import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Url } from 'src/app/services/variables.model';
import { GlobalService } from 'src/app/services/samad-services/global.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-multiple',
  templateUrl: './upload-multiple.component.html',
  styleUrls: ['./upload-multiple.component.css']
})
export class UploadMultipleComponent implements OnInit {
  @Input() public isMultiple: boolean = false;
  @Input() public color: string = "primary";
  @Input() public filesTypes: string;
  @Input() public action: string;
  @Input() PrgMess = [{ progress: 0, messages: '' }];
  @Output() public onUploadFinished = new EventEmitter();
  messages: string[];
  progress: number[];

  constructor(
    public http: HttpClient,
    public globServ: GlobalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.messages = [];
    this.progress = [];

  }

  viderMessage() {
    this.messages = [];
    this.progress = [];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  uploadFile = (files) => {
    this.PrgMess = [{ progress: 0, messages: '' }];

    if (files.length == 0)
      return;

    for (let i = 0; i < files.length; i++) {
      let fileToUpload = <File>files[i];

      let fileName = "";
      let index;
      for (let r = fileToUpload.name.length - 1; r >= 0; r--) {
        if (fileToUpload.name[r] != ".") {
          index = r;
        }
        else {
          break;
        }
      }
      //console.log(index);

      for (let s = index; s < fileToUpload.name.length; s++) {
        fileName += fileToUpload.name[s];
      }

      //console.log(fileName);
      var newFileName = Date.now().toString() + this.getRandomInt(10000) + "." + fileName;

      const formData = new FormData();
      formData.append('file', fileToUpload, newFileName);

      this.http.post(Url + this.action, formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          this.PrgMess.push({ progress: 0, messages: '' });
          if (event.type === HttpEventType.UploadProgress) {
            this.PrgMess[i].progress = Math.round(100 * event.loaded / event.total);
          }
          else if (event.type === HttpEventType.Response) {
            this.onUploadFinished.emit(event.body);
          }
        }, err => {
          this.globServ.postError({ message: JSON.stringify(err) + "" }).subscribe(
            () => {
              this.toastr.warning("Veuillez  réessayer plutard", "Erreur")
              duration: 10000

            }, err => {
              this.toastr.warning("Veuillez Vérifier la connexion internet, puis réessayer", "Erreur")
            });
          this.onUploadFinished.emit("ERREUR");
        }
        );
      //this.onUploadFinished.emit(new Date().getMilliseconds())
    }
  }
}
