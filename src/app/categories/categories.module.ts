import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NgParticlesModule } from 'ng-particles';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SwiperModule } from 'swiper/angular'
import { DetailsCategorieComponent } from './details-categorie/details-categorie.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
  declarations: [
    CategoriesComponent,
    DetailsCategorieComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    NgParticlesModule,
    SwiperModule,
    NgxSkeletonLoaderModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CategoriesModule { }
