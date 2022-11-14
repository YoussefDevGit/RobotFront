import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierDetailsComponent } from './panier-details/panier-details.component';

const routes: Routes = [
  {
    path: '',
    component: PanierDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanierRoutingModule { }