/// <reference types="@types/googlemaps" />

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Marker = google.maps.Marker;

import { ReportsService } from '../../../services/reports.service';
import { Report } from '../../../models/Report';
import { Address } from '../../../models/Address';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPickerComponent implements OnInit {

  @ViewChild(GoogleMap, { static: true }) map: GoogleMap;

  marker: Marker = new Marker({
    visible: false,
  });

  zoom = 16;

  center: google.maps.LatLngLiteral = null;

  options: google.maps.MapOptions = {
    zoomControl: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
    fullscreenControl: false,
    mapTypeControl: false,
  };

  address: string = null;

  placeResult: google.maps.places.PlaceResult = null;

  closeIcon = faTimes;

  constructor(
    private router: Router,
    private reportsService: ReportsService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.changeDetectionRef.detectChanges();
    });
  }

  onPrevious(): void {
    this.router.navigate(['/home']).then(() => this.reportsService.isCreatingReport = false);
  }

  onNext(): void {
    this.router.navigate(['/questions']).then(() => {
      const report = new Report();

      report.address = new Address(this.placeResult.formatted_address, this.placeResult.name);
      this.reportsService.report = report;
    });
  }

  get addressStreetAndNumber(): string {
    return `${this.getAddressComponent(['route'])} ${this.getAddressComponent(['street_number'])}`;
  }

  get addressPostalCodeAndCity(): string {
    return `${this.getAddressComponent(['postal_code'])} ${this.getAddressComponent(['locality', 'political'])}`;
  }

  getAddressOnChange(placeResult: google.maps.places.PlaceResult): void {
    if (placeResult.address_components == null) return;

    this.placeResult = placeResult;
    this.address = placeResult.formatted_address;

    this.center = {
      lat: placeResult.geometry.location.lat(),
      lng: placeResult.geometry.location.lng()
    };
    this.marker.setPosition(this.center);
    this.marker.setOptions({
      visible: true,
    });

    this.changeDetectionRef.detectChanges();
  }

  private getAddressComponent(keys: string[]): string {
    let addressComponent = '';

    for (const component of this.placeResult.address_components) {
      if (component.types.toString() === keys.toString()) addressComponent = component.long_name;
    }
    return addressComponent;
  }
}
