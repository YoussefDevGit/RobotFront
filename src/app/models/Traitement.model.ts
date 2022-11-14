import { Categories, InfosLivraison } from "./Gestion.model";

export class InfosImage {
  path?: string;
}

export class Rechercher {
  rech?: string;
  categorie?: Categories;
}

export class ProduitPanier {
  idOptionProd?: number;
  idProd?: number;
  libelle?: string;
  type?: string;
  option?: string;
  description?: string;
  image?: string;
  prixUnitaire?: number;
  quantite?: number;
}

export class Panier {
  datePanier?: Date;
  infosLivraison?: InfosLivraison;
  produits?: ProduitPanier[];
}

export class MyImage {
  path?: string;
  name?: string;
}

export class Partenaires {
  idPart?: number;
  raisonSociale?: string;
  description?: string;
  siteWeb?: string;
  image?: string;
  etat?: boolean;
}


export class SlidesAccueil {
  idSlide?: number;
  titre?: string;
  description?: string;
  siteWeb?: string;
  image?: string;
  etat?: boolean;
}
