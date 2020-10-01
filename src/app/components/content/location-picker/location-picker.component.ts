import {Component, NgModule, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import { GoogleMapsModule } from '@angular/google-maps';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {

  apiLoaded: Observable<boolean>;

  latitude = 51.678418;
  longitude = 7.809007;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyChRCsyOAkOQLluldLYp0rfVNoRFnhkEQU', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {}

}

@NgModule({
  declarations: [
    LocationPickerComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
    LocationPickerComponent,
  ]
})
export class LocationPickerModule {}
