import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardCategorieComponent } from './dashboard-categorie/Dashboard-categorie.component';
import { DashboardContactusComponent } from './dashboard-contactus/dashboard-contactus.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardPartenairesComponent } from './dashboard-partenaires/dashboard-partenaires.component';
import { DashboardPersoInfosComponent } from './dashboard-perso-infos/dashboard-perso-infos.component';
import { DashboardProduitComponent } from './dashboard-produit/dashboard-produit.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardProjetComponent } from './dashboard-projet/Dashboard-projet.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { DashboardSlidesAccueilComponent } from './dashboard-slides-accueil/dashboard-slides-accueil.component';

// const DashboardChildrenRoute: Routes = [
//   // {
//   //   path: '',
//   //   pathMatch: 'full',
//   //   component: DashboardIndexComponent
//   // },
//   // {
//   //   path: 'saved-items',
//   //   component: DashboardSavedItemComponent
//   // },
//   // {
//   //   path: 'profile',
//   //   component: DashboardProfileComponent
//   // },
//   // {
//   //   path: 'orders',
//   //   component: DashboardOrderComponent
//   // }
//   {
//     path: 'dashbaord',
//     component: DashboardIndexComponent,
//     pathMatch: 'full',
//     children: [
//       {
//         path: '',
//         component: DashboardIndexComponent,
//       },
//       {
//         path: 'profile',
//         component: DashboardProfileComponent,
//       },
//       {
//         path: 'commandes',
//         component: DashboardOrderComponent
//       },
//       {
//         path: 'Projets',
//         component: DashboardProjetComponent
//       },
//       {
//         path: 'Categories',
//         component: DashboardCategorieComponent
//       },
//       {
//         path: 'produits',
//         component: DashboardProduitComponent
//       },
//       {
//         path: 'saved-items',
//         component: DashboardSavedItemComponent
//       }
//     ],
//     canActivate: [AuthGuard]
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    // children: DashboardChildrenRoute
    children: [
      {
        path: '',
        redirectTo: "profile",
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'dashbaord',
      //   component: DashboardIndexComponent,
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'profile',
        component: DashboardProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'perso-infos',
        component: DashboardPersoInfosComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'contactus',
        component: DashboardContactusComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'commandes',
        component: DashboardOrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'projets',
        component: DashboardProjetComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'categories',
        component: DashboardCategorieComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'produits',
        component: DashboardProduitComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'saved-items',
        component: DashboardSavedItemComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'partenaires',
        component: DashboardPartenairesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'slides',
        component: DashboardSlidesAccueilComponent,
        canActivate: [AuthGuard]
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
