import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BaseLayoutComponent } from './shared/components/layouts/base-layout/base-layout.component';

const baseLayoutRouting: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'ateliers',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then(m => m.PanierModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'projets',
    loadChildren: () => import('./projets/projets.module').then(m => m.ProjetsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: baseLayoutRouting
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'doc',
    loadChildren: () => import('./doc/doc.module').then(m => m.DocModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
