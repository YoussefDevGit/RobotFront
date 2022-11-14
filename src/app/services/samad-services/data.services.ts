import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from '../variables.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public http: HttpClient) { }

  readonly url = Url;

  //!-----------------  categories  --------------------//
  getAllCategories() {
    return this.http.get(this.url + '/Categories/getAllCategories');
  }

  getAllCategoriesWithSomeProds() {
    return this.http.get(this.url + '/Categories/getAllCategoriesWithSomeProds');
  }
  getNbrCategoriesWithSomeProds(nbrCat) {
    return this.http.get(this.url + '/Categories/getNbrCategoriesWithSomeProds/' + nbrCat);
  }
  getCategorieWithDetails(idCat) {
    return this.http.get(this.url + '/Categories/getCategorieWithDetails/' + idCat);
  }

  GetAllTitresCategories_NT() {
    return this.http.get(this.url + '/Categories/GetAllTitresCategories_NT');
  }

  ChercherProducts(rech) {
    return this.http.post(this.url + '/Produits/ChercherProducts', rech);
  }

  getAllProjets_NT() {
    return this.http.get(this.url + '/Projets/getAllProjets_NT');
  }

  getProjetWithDetails(idProjet) {
    return this.http.get(this.url + '/Projets/getProjet_NT/' + idProjet);
  }

  getAllParts() {
    return this.http.get(this.url + '/Partenaires/getParts_NT');
  }

  getAllSlides() {
    return this.http.get(this.url + '/Slides/getSlides_NT');
  }


  getSomeCategories_NT() {
    return this.http.get(this.url + '/Categories/getSomeCategories_NT');
  }

  getSomeProds_NT() {
    return this.http.get(this.url + '/Produits/getSomeProds_NT');
  }

  getSomeProjs_NT() {
    return this.http.get(this.url + '/Projets/getSomeProjs_NT');
  }

  //! ussef
  //!-----------------  produits  --------------------//
  getProduitDetail(idProduit) {
    return this.http.get(this.url + '/Produits/getProduitDetail/' + idProduit);
  }

  getProdCategorie(idProduit) {
    return this.http.get(this.url + '/Produits/getProdCategorie/' + idProduit);
  }
  //! ussef
}
