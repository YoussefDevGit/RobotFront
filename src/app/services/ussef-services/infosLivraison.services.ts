import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../variables.model'

@Injectable({
  providedIn: 'root'
})
export class InfosService {
  constructor(public http: HttpClient) { }

  readonly url = Url;

  //!----------------- Gestion infosLivraison  --------------------//
  PutInfosLivraison(info) {
    return this.http.put(this.url + '/InfosLivraison', info);
  }

}
