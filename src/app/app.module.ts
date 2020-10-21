import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AddressInputDirective } from './directives/address-input.directive';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/content/home/home.component';
import { QuestionComponent } from './components/content/question/question.component';
import { LocationPickerComponent } from './components/content/location-picker/location-picker.component';
import { PartnerComponent } from './components/content/partner/partner.component';
import { LoginComponent } from './components/content/login/login.component';

@NgModule({
  declarations: [
    AddressInputDirective,
    AppComponent,
    HomeComponent,
    LocationPickerComponent,
    LoginComponent,
    NavbarComponent,
    PartnerComponent,
    QuestionComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    GoogleMapsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
