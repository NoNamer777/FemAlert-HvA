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
import { EmailMoreInfoDialogComponent } from './components/content/question/email-more-info-dialog/email-more-info-dialog.component';
import { ConfirmationComponent } from './components/content/confirmation/confirmation.component';
import { AboutComponent } from './components/content/about/about.component';
import { FaqComponent } from './components/content/faq/faq.component';
import { NotFoundComponent } from './components/content/not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmSendDialogComponent } from './components/content/question/confirm-send-dialog/confirm-send-dialog.component';
import { AdminComponent } from './components/content/admin/admin.component';
import { SidebarComponent } from './components/content/admin/sidebar/sidebar.component';
import { DashboardComponent } from './components/content/admin/dashboard/dashboard.component';
import { StatisticsComponent } from './components/content/admin/statistics/statistics.component';
import { MembersComponent } from './components/content/admin/members/members.component';
import { ServerManagementComponent } from './components/content/admin/server-management/server-management.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { EntityEditorComponent } from './components/content/admin/server-management/entity-editor/entity-editor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddPartnerComponent } from './components/content/admin/add-partner/add-partner.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MemberPopupComponent } from './components/content/admin/members/member-popup/member-popup.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { ContactConfirmationComponent } from './components/content/contact/contact-confirmation/contact-confirmation.component';

@NgModule({
  declarations: [
    AddressInputDirective,
    AppComponent,
    HomeComponent,
    LocationPickerComponent,
    NavbarComponent,
    PartnerComponent,
    QuestionComponent,
    EmailMoreInfoDialogComponent,
    ConfirmationComponent,
    AboutComponent,
    FaqComponent,
    NotFoundComponent,
    ConfirmSendDialogComponent,
    ContactComponent,
    ContactConfirmationComponent,
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    StatisticsComponent,
    MembersComponent,
    ServerManagementComponent,
    EntityEditorComponent,
    AddPartnerComponent,
    MemberPopupComponent,
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
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [MemberPopupComponent]
})
export class AppModule { }
