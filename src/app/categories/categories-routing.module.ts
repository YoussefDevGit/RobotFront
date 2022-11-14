import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { DetailsCategorieComponent } from './details-categorie/details-categorie.component';

const routes: Routes = [
  {
    path: ':idCategorie',
    component: DetailsCategorieComponent,
    pathMatch: "full"

  },
  {
    path: '',
    component: CategoriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
