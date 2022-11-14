import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../variables.model'

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  constructor(public http: HttpClient) { }

  readonly url = Url;

  //!----------------- Gestion categories  --------------------//
  getEntrepriseInfos() {
    return this.http.get(this.url + '/PersonnelInfos/getEntrepriseInfos');
  }

  getEntrepriseInfos_NT() {
    return this.http.get(this.url + '/PersonnelInfos/getEntrepriseInfos_NT');
  }

  EntrepriseInfos(entreprise) {
    return this.http.post(this.url + '/PersonnelInfos/EntrepriseInfos', entreprise);
  }

  deleteTelAdresseEmail(type, id) {
    return this.http.delete(this.url + '/PersonnelInfos/delete/' + [type, id].join("/"));
  }
}
