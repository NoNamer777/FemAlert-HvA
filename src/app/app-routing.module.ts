import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent} from './components/content/homepage/homepage.component';
import { QuestionComponent } from './components/content/question/question.component';
import { PartnerComponent } from './components/content/partner/partner.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'questions', component: QuestionComponent }
  { path: 'questions', component: QuestionComponent },
  { path: 'partner', component: PartnerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
