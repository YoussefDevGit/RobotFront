import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeProductsComponent } from './home-products/home-products.component';
import { NgParticlesModule } from 'ng-particles';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [HomeComponent, HomeProductsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgParticlesModule,
    SwiperModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
