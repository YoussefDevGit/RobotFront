import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../variables.model'
import { MyImage } from 'src/app/models/Traitement.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(public http: HttpClient) { }

  readonly url = Url;


  //-----------------Authentification gestion --------------------//
  postError(item) {
    return this.http.post(this.url + "/Erreurs", item);
  }

  deletePicture(img: MyImage) {
    return this.http.post(this.url + "/Resources/DeleteImage", img);
  }
}
