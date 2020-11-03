import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appAddressInput]',
  providers: [ NgModel ],
})
export class AddressInputDirective {

  @Output()
  setAddress = new EventEmitter<google.maps.places.PlaceResult>();

  modelValue: NgModel;

  autocomplete: google.maps.places.Autocomplete;

  private readonly _element: HTMLInputElement;

  constructor(element: ElementRef, private model: NgModel) {
    this._element = element.nativeElement;
    this.modelValue = this.model;

    this.autocomplete = new google.maps.places.Autocomplete(this._element);

    google.maps.event.addListener(
      this.autocomplete,
      'place_changed',
      () => this.setAddress.emit(this.autocomplete.getPlace())
    );
  }
}
