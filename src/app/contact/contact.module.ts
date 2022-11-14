import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleLocationMapComponent } from './google-location-map/google-location-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SafePipe } from '../safe.pipe';

@NgModule({
  declarations: [
    ContactComponent,
    GoogleLocationMapComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  exports: [
    GoogleLocationMapComponent
  ]
})
export class ContactModule { }
