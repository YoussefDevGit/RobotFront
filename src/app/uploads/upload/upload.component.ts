import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(public service: GlobalService) { }

  ngOnInit(): void {
    this.messages = '';
    this.progress = 0;
  }


  messages: string;
  progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  uploadFile = (files) => {
    this.messages = "";
    this.progress = 0;
    if (files.length == 0)
      return;

    let fileToUpload = <File>files[0];
    var newFileName = Date.now().toString() + fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload, newFileName);

    this.service.http.post(this.service.Uri + '/Upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {
          this.messages = 'Bien Enregistrer';
          this.onUploadFinished.emit(event.body);
        }
      }

      )
  }
}

