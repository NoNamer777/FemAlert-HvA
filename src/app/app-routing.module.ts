import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './components/content/home/home.component';
import { QuestionComponent } from './components/content/question/question.component';
import { LocationPickerComponent } from './components/content/location-picker/location-picker.component';
import { PartnerComponent } from './components/content/partner/partner.component';
import { ConfirmationComponent } from './components/content/confirmation/confirmation.component';
import { AboutComponent } from './components/content/about/about.component';
import { FaqComponent } from './components/content/faq/faq.component';
import { NotFoundComponent } from './components/content/not-found/not-found.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { ContactConfirmationComponent } from './components/content/contact/contact-confirmation/contact-confirmation.component';
import { AdminComponent } from './components/content/admin/admin.component';
import { DashboardComponent } from './components/content/admin/dashboard/dashboard.component';
import { StatisticsComponent } from './components/content/admin/statistics/statistics.component';
import { MembersComponent } from './components/content/admin/members/members.component';
import { ServerManagementComponent } from './components/content/admin/server-management/server-management.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AddPartnerComponent } from './components/content/admin/add-partner/add-partner.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rapporteren', children: [
      { path: 'locatie', component: LocationPickerComponent },
      { path: 'formulier', component: QuestionComponent }
    ]},
  { path: 'login', component: PartnerComponent },
  { path: 'partner', component: AdminComponent, children: [
      { path: 'server-management', component: ServerManagementComponent, canActivate: [AuthenticationGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]},
      { path: 'statistics', component: StatisticsComponent, canActivate: [AuthenticationGuard] },
      { path: 'members', component: MembersComponent, canActivate: [AuthenticationGuard] },
      { path: 'add-member', component: AddPartnerComponent, canActivate: [AuthenticationGuard] },
    ]},
  { path: 'bevestiging-melding', component: ConfirmationComponent },
  { path: 'over-ons', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contact-bevestiging', component: ContactConfirmationComponent },

  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
