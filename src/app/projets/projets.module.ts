import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NgParticlesModule } from 'ng-particles';

import { SwiperModule } from 'swiper/angular'
import { ProjetsComponent } from './projets.component';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { ProjetsRoutingModule } from './projets-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
  declarations: [
    ProjetsComponent,
    DetailsProjetComponent
  ],
  imports: [
    CommonModule,
    ProjetsRoutingModule,
    SharedModule,
    NgParticlesModule,
    SwiperModule,
    NgxSkeletonLoaderModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProjetsModule { }
