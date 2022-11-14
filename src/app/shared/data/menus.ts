export interface Menu {
  path: string;
  name: string;
  icon?: string;
  class?: string;
}

export const menuList: Menu[] = [
  {
    path: '/ateliers',
    name: 'Ateliers',
    icon: 'info',
    class: "atelier"
  },
  {
    path: '/projets',
    name: 'Projets',
    icon: 'view_list'
  },
  {
    path: '/categories',
    name: 'Catégories',
    icon: 'storage'
  },
  {
    path: '/products',
    name: 'Produits',
    icon: 'subtitles'
  },

  {
    path: '/contact',
    name: 'Contactez-nous',
    icon: 'contact_mail'
  },

  // ,
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard'
  // }
  // ,
  // {
  //   path: '/doc',
  //   name: 'Doc'
  // }
];
