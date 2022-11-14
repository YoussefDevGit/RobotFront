import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../variables.model'

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  constructor(public http: HttpClient) { }

  readonly url = Url;

  //!----------------- Gestion commande  --------------------//
  PostCommande(com) {
    return this.http.post(this.url + '/Commandes', com);
  }

  GetAllOrders() {
    return this.http.get(this.url + '/Commandes/GetAllOrders');
  }

  GetSelectedOrder(idCommande) {
    return this.http.get(this.url + '/Commandes/GetSelectedOrder/' + idCommande);
  }

}
