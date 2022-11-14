import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../variables.model'

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  constructor(public http: HttpClient) { }

  readonly url = Url;

  //!----------------- Gestion categories  --------------------//
  PostCategorie(cat) {
    return this.http.post(this.url + '/Categories/PostCategorie', cat);
  }

  GetAllDetailsCategories() {
    return this.http.get(this.url + '/Categories/GetAllDetailsCategories');
  }

  PutCategorie(cat) {
    return this.http.put(this.url + '/Categories/PutCategorie', cat);
  }

  DeleteCategorie(idCat) {
    return this.http.delete(this.url + '/Categories/DeleteCategorie/' + idCat);
  }

  GetAllTitresCategories() {
    return this.http.get(this.url + '/Categories/GetAllTitresCategories');
  }

  GetAllTitresTypesProd() {
    return this.http.get(this.url + '/TypesProduit/GetAllTitresTypesProd');
  }

  //! Contacts :
  GetAllMessages() {
    return this.http.get(this.url + '/Contacts');
  }

  DeleteMessage(idMssg) {
    return this.http.delete(this.url + '/Contacts/' + idMssg);
  }

  //!----------------- Gestion Produits  --------------------//
  PostProduit(prod) {
    return this.http.post(this.url + '/Produits/PostProduit', prod);
  }


  GetAllDetailsProduits() {
    return this.http.get(this.url + '/Produits/GetAllDetailsProduits');
  }

  PutProduit(prod) {
    return this.http.put(this.url + '/Produits/PutProduit', prod);
  }

  DeleteProduit(idProd) {
    return this.http.delete(this.url + '/Produits/DeleteProduit/' + idProd);
  }

  deleteOptionProduit(idOption) {
    return this.http.delete(this.url + '/Produits/DeleteOptionProd/' + idOption);
  }

  GetAllTitresProduits() {
    return this.http.get(this.url + '/Produits/GetAllTitresProduits');
  }

  GetAllOptionsProduit(idProduit) {
    return this.http.get(this.url + '/Produits/GetAllOptionsProduit/' + idProduit);
  }


  //!----------------- Gestion projets  --------------------//

  getAllProjects() {
    return this.http.get(this.url + '/Projets/getAllProjects');
  }

  PostProjet(projet) {
    return this.http.post(this.url + '/Projets/PostProjet', projet);
  }

  DeletetProjet(idProjet) {
    return this.http.delete(this.url + '/Projets/DeleteProjet/' + idProjet);
  }

  PutProjet(projet) {
    return this.http.put(this.url + '/Projets/PutProjet', projet);
  }

  DeleteApplicationProduit(idProjet, idOption) {
    return this.http.delete(this.url + '/Projets/DeleteApplicationProduit/' + [idProjet, idOption].join("/"));
  }

  //! gestion partenaires :
  GetAllPartenaires() {
    return this.http.get(this.url + '/Partenaires');
  }

  PostPartenaire(part) {
    return this.http.post(this.url + '/Partenaires', part);
  }

  DeletePartenaire(idpart) {
    return this.http.delete(this.url + '/Partenaires/' + idpart);
  }

  PutPartenaire(part) {
    return this.http.put(this.url + '/Partenaires', part);
  }

  PutPartenaireEtat(part) {
    return this.http.put(this.url + '/Partenaires/PutEtatPart', part);
  }

  //! Gestion Slides
  GetAllSlides() {
    return this.http.get(this.url + '/Slides');
  }

  PostSlideAccueil(slide) {
    return this.http.post(this.url + '/Slides', slide);
  }

  DeleteSlideAccueil(idSlide) {
    return this.http.delete(this.url + '/Slides/' + idSlide);
  }

  PutSlideAccueil(slide) {
    return this.http.put(this.url + '/Slides', slide);
  }

  PutSlideAccueilEtat(slide) {
    return this.http.put(this.url + '/Slides/PutEtatSlide', slide);
  }

}
