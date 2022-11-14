export class Produits {
  idProduit?: number;
  idCategorie?: number;
  designation?: string;
  description?: string;
  dateAjout?: Date;
  idType?: number;

  applicationsProduit?: ApplicationsProduit[];
  categoriesProduit?: CategoriesProduit[];
  optionsProduit?: OptionsProduit[];
  photosProduit?: PhotosProduit[];
  idTypeNavigation?: TypeProduit;
}

export class Categories {
  idCategorie?: number;
  libelle?: string;
  description?: string;
  path?: string;
  dateMessage?: Date;
  categoriesProduit?: CategoriesProduit[];

  count?: number;
}

export class CategoriesProduit {
  idProduit?: number;
  idCategorie?: number;

  idCategorieNavigation?: Categories;
  idProduitNavigation?: Produits;
}

export class Commandes {
  idCommande?: number;
  dateCommande?: Date;
  etatCommande?: string;
  coutLivraison?: number;
  idLivraison?: number;

  idLivraisonNavigation?: InfosLivraison;
  detailsCommande?: DetailsCommande[];
}

export class DetailsCommande {
  idOpProduit?: number;
  idCommande?: number;
  quantite?: number;
  prixUnitaire?: number;

  idCommandeNavigation?: Commandes;
  idOpProduitNavigation?: OptionsProduit;
}



export class ContactUs {
  idContact?: number;
  nomComplet?: string;
  numTel?: string;
  email?: string;
  objet?: string;
  message?: string;
  dateMessage?: Date;
}

export class OptionsProduit {
  idOpProduit?: number;
  idProduit?: number;
  valeurType?: string;
  description?: string;
  prixUnitaire?: number;
  pathPhotoOpProd?: string;
  dateAjoutOpProd?: Date;
  etatProduit?: string;

  idProduitNavigation?: Produits;
  detailsCommande?: DetailsCommande[];
  applicationsProduit?: ApplicationsProduit[];
}

export class TypeProduit {
  idType?: number;
  libelle?: string;
  symbole?: string;
  optionsProduit?: OptionsProduit[];
}


export class PhotosProduit {
  idPhoto?: number;
  idProduit?: number;
  path?: string;

  idProduitNavigation?: Produits;
}

export class ApplicationsProduit {
  idOptionProduit?: number;
  idProjet?: number;
  quantite?: number;

  idOptionProduitNavigation?: OptionsProduit;
  idProjetNavigation?: Projets;

  //(n'exite pas dans la base de données) :
  desabled?: boolean;
  produit?: Produits;
  options?;
}



// export class PhotosCategorie {
//   idPhoto?: number;
//   idCategorie?: number;
//   path?: string;
//   idCategorieNavigation?: Categories;
// }

export class Projets {
  idProjet?: number;
  libelle?: string;
  description?: string;
  dateAjout?: Date;
  applicationsProduit?: ApplicationsProduit[];
  photosProjet?: PhotosProjet[];
}

export class PhotosProjet {
  idPhoto?: number;
  idProjet?: number;
  path?: string;

  idProjetNavigation?: Projets;
}

export class InfosLivraison {
  idLivraison?: number;
  nomComplet?: string;
  email?: string;
  numTel?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;

  commandes?: Commandes[];
}

export class MonEntreprise {
  idEnt?: number;
  raisonSociale?: string;
  description?: string;
  postitionMaps?: string;

  monEntrepriseAdresses?: MonEntrepriseAdresses[];
  monEntrepriseTelephones?: MonEntrepriseTelephones[];
  monEntrepriseEmails?: MonEntreprissEmails[];
}

export class MonEntrepriseAdresses {
  idAdresse?: number;
  idEnt?: number;
  adresse?: string;

  idEntNavigation?: MonEntreprise;
}

export class MonEntrepriseTelephones {
  idTel?: number;
  idEnt?: number;
  tel?: string;
  idEntNavigation?: MonEntreprise;
}

export class MonEntreprissEmails {
  idEmail?: number;
  idEnt?: number;
  email?: string;
  idEntNavigation?: MonEntreprise;
}