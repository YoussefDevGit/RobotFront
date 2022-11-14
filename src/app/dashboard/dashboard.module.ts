import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardProduitComponent } from './dashboard-produit/dashboard-produit.component';
import { DashboardCategorieComponent } from './dashboard-categorie/Dashboard-categorie.component';
import { DashboardProjetComponent } from './dashboard-projet/Dashboard-projet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { UploadMultipleComponent } from '../uploadsMultiple/upload-multiple/upload-multiple.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from "@angular/material/dialog";
import { DashboardContactusComponent } from './dashboard-contactus/dashboard-contactus.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DashboardPersoInfosComponent } from './dashboard-perso-infos/dashboard-perso-infos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardPartenairesComponent } from './dashboard-partenaires/dashboard-partenaires.component';
import { DashboardSlidesAccueilComponent } from './dashboard-slides-accueil/dashboard-slides-accueil.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    DataTablesModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule
  ],
  declarations: [
    DashboardLayoutComponent,
    DashboardIndexComponent,
    DashboardSavedItemComponent,
    DashboardProfileComponent,
    DashboardOrderComponent,
    DashboardProduitComponent,
    DashboardCategorieComponent,
    DashboardProjetComponent,
    UploadMultipleComponent,
    DashboardContactusComponent,
    DashboardPersoInfosComponent,
    DashboardPartenairesComponent,
    DashboardSlidesAccueilComponent,
    DashboardSlidesAccueilComponent
    // CourseDialogComponent
  ]
  //,
  // entryComponents: [CourseDialogComponent]

})
export class DashboardModule { }
