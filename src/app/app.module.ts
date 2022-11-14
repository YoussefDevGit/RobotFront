import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './guards/auth.interceptor';
import { SwiperModule } from 'swiper/angular'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyPanierService } from './services/my-panier.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent],
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    ToastrModule.forRoot(),
    SwiperModule,
    FontAwesomeModule,
  ],
  providers: [
    DatePipe,
    //, {provide: LocationStrategy, useClass:  PathLocationStrategy}
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MyPanierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
