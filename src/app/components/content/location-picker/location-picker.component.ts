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

/** Animation for when the address is set and displayed or removed. */
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

  /** Reference to the Google Maps element */
  @ViewChild(GoogleMap, { static: true }) map: GoogleMap;

  /** Marker of the set address. */
  marker: google.maps.Marker = new google.maps.Marker({
    visible: false,
  });

  /** The current zoom level. */
  zoom = 16;

  /** A variable reference to the center of the map. */
  center: google.maps.LatLngLiteral = null;

  /** The Google Map configuration. */
  options: google.maps.MapOptions = {
    zoomControl: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
  };

  /** The current address, if any. */
  address: string = null;

  /** Result of the searched terms. */
  placeResult: google.maps.places.PlaceResult = null;

  /** Fontawesome icon for the close button. */
  closeIcon = faTimes;

  constructor(
    private router: Router,
    private rapportsService: RapportsService,
    private sessionStorageService: SessionStorageService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get the current position of the device, if allowed.
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.changeDetectionRef.markForCheck();
    });

    // Get the location from the Rapport that is already in session.
    if (this.rapportsService.rapport != null) {
      this.address = this.rapportsService.rapport.address.formattedAddress;
      (document.documentElement.querySelector('input#address-input') as HTMLInputElement).value =
        this.rapportsService.rapport.address.formattedAddress;

      const geoCoder = new google.maps.Geocoder();
      const request = { address: this.address } as google.maps.GeocoderRequest;

      // Gets the name of the business registered on the address, if present.
      geoCoder.geocode(request, (geocoderResults: google.maps.GeocoderResult[]) => {
        (geocoderResults[0] as any as google.maps.places.PlaceResult).name =
          this.rapportsService.rapport.address.businessName;

        this.getAddressOnChange(geocoderResults[0] as any as google.maps.places.PlaceResult);
      });
    }
  }

  /** Stops the creation of the rapport. */
  onPrevious(): void {
    this.router.navigate(['/home']);

    this.rapportsService.isCreatingRapport = false;
  }

  /** Continues to the Rapport form. */
  onNext(): void {
    this.router.navigate(['/rapporteren/formulier']);

    // Instantiate a new Rapport object, provided with the set Address location.
    const rapport =  new Rapport();
    rapport.address = new Address(this.placeResult.formatted_address, this.placeResult.name);

    this.rapportsService.rapport = rapport;
  }

  /** Gets the address street and number if present in the Address. */
  get addressStreetAndNumber(): string {
    return `${this.getAddressComponent(['route'])} ${this.getAddressComponent(['street_number'])}`;
  }

  /** Gets the address postal code and city / region if present in the Address. */
  get addressPostalCodeAndCity(): string {
    return `${this.getAddressComponent(['postal_code'])} ${this.getAddressComponent(['locality', 'political'])}`;
  }

  /** Handles Address changes. */
  getAddressOnChange(placeResult: google.maps.places.PlaceResult): void {
    // Don't change the address when there is no result and hide the marker.
    if (placeResult.address_components == null) {
      this.placeResult = null;
      this.marker.setOptions({
        visible: false
      });

      return;
    }
    this.placeResult = placeResult;
    this.address = placeResult.formatted_address;

    // Center the map on the Address Geolocation.
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

  /** Finds a single Address Component value from the Address Components. */
  private getAddressComponent(keys: string[]): string {
    let addressComponent = '';

    for (const component of this.placeResult.address_components) {
      if (component.types.toString() === keys.toString()) addressComponent = component.long_name;
    }
    return addressComponent;
  }
}
