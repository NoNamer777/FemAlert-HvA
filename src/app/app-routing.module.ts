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
import { AdminComponent } from './components/content/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'locatie', component: LocationPickerComponent },
  { path: 'formulier', component: QuestionComponent },
  { path: 'login', component: PartnerComponent },
  { path: 'partner', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
    ]},
  { path: 'bevestiging-melding', component: ConfirmationComponent },
  { path: 'over-ons', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'not-found', component: NotFoundComponent },
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
