import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './components/content/home/home.component';
import { QuestionComponent } from './components/content/question/question.component';
import { LocationPickerComponent } from './components/content/location-picker/location-picker.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'location-picker', component: LocationPickerComponent },
  { path: 'questions', component: QuestionComponent },
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
