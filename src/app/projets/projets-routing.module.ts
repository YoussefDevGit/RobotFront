import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { ProjetsComponent } from './projets.component';

const routes: Routes = [
  {
    path: ':idProjet',
    component: DetailsProjetComponent,
    pathMatch: "full"

  },
  {
    path: '',
    component: ProjetsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetsRoutingModule { }
