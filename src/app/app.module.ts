import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/homepage/header/header.component';
import { CenterComponent } from './components/homepage/center/center.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
