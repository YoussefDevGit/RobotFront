import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../variables.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) { }

  readonly url = Url;


  //-----------------Authentification gestion --------------------//
  login(login) {
    return this.http.post(this.url + '/Users/Login', login);
  }

  getConnectedUser() {
    return this.http.get(this.url + '/Users/GetConnectedUser');
  }

  sendMessage(mssg) {
    return this.http.post(this.url + '/Contacts', mssg);
  }
}
