import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgParticlesModule } from 'ng-particles';
import { PanierRoutingModule } from './panier-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PanierDetailsComponent } from './panier-details/panier-details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PanierDetailsComponent],
  imports: [
    CommonModule,
    PanierRoutingModule,
    SharedModule,
    MatExpansionModule,
    NgParticlesModule,
    NgxSkeletonLoaderModule,
    SwiperModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PanierModule { }
