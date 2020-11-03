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
import { EmailMoreInfoDialogComponent } from './components/content/question/email-more-info-dialog/email-more-info-dialog.component';
import { ConfirmationComponent } from './components/content/confirmation/confirmation.component';
import { FaqComponent } from './components/content/faq/faq.component';
import { NotFoundComponent } from './components/content/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

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
    EmailMoreInfoDialogComponent,
    LoginComponent,
    ConfirmationComponent,
    FaqComponent,
    NotFoundComponent,
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
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
