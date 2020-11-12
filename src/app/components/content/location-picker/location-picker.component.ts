/// <reference types="@types/googlemaps" />

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { SessionStorageService } from '../../../services/session-storage.service';
import { RapportsService } from '../../../services/rapports.service';
import { Rapport } from '../../../models/Rapport';
import { Address } from '../../../models/Address';

const addressSetAnimation = trigger('showHide', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    animate('0.3s ease-in', style({ height: '*', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    animate('0.2s ease-out', style({ height: 0, opacity: 0 }))
  ])
]);

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    addressSetAnimation,
  ],
})
export class LocationPickerComponent implements OnInit {

  @ViewChild(GoogleMap, { static: true }) map: GoogleMap;

  marker: google.maps.Marker = new google.maps.Marker({
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
    streetViewControl: false,
  };

  address: string = null;

  placeResult: google.maps.places.PlaceResult = null;

  closeIcon = faTimes;

  constructor(
    private router: Router,
    private rapportsService: RapportsService,
    private sessionStorageService: SessionStorageService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.changeDetectionRef.markForCheck();
    });

    if (this.rapportsService.rapport != null) {
      this.address = this.rapportsService.rapport.address.formattedAddress;
      (document.documentElement.querySelector('input#address-input') as HTMLInputElement).value =
        this.rapportsService.rapport.address.formattedAddress;

      const geoCoder = new google.maps.Geocoder();
      const request = { address: this.address } as google.maps.GeocoderRequest;

      geoCoder.geocode(request, (geocoderResults: google.maps.GeocoderResult[]) => {
        (geocoderResults[0] as any as google.maps.places.PlaceResult).name =
          this.rapportsService.rapport.address.businessName;

        this.getAddressOnChange(geocoderResults[0] as any as google.maps.places.PlaceResult);
      });
    }
  }

  onPrevious(): void {
    this.router.navigate(['/home']).then(() => this.rapportsService.isCreatingRapport = false);
  }

  onNext(): void {
    this.router.navigate(['/formulier']).then(() => {
      const rapport =  new Rapport();

      rapport.address = new Address(this.placeResult.formatted_address, this.placeResult.name);

      this.rapportsService.rapport = rapport;
    });
  }

  get addressStreetAndNumber(): string {
    return `${this.getAddressComponent(['route'])} ${this.getAddressComponent(['street_number'])}`;
  }

  get addressPostalCodeAndCity(): string {
    return `${this.getAddressComponent(['postal_code'])} ${this.getAddressComponent(['locality', 'political'])}`;
  }

  getAddressOnChange(placeResult: google.maps.places.PlaceResult): void {

    if (placeResult.address_components == null) {
      this.placeResult = null;
      this.marker.setOptions({
        visible: false
      });

      return;
    }
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
