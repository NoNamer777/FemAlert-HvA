export class Address {

  get businessName(): string {
    return this._businessName;
  }

  set businessName(businessName: string) {
    this._businessName = businessName;
  }

  private _businessName: string = null;

  get formattedAddress(): string {
    return this._formattedAddress;
  }

  set formattedAddress(formattedAddress: string) {
    this._formattedAddress = formattedAddress;
  }

  private _formattedAddress: string = null;

  constructor(formattedAddress: string, businessName?: string) {

    if (businessName != null) this._businessName = businessName;
    this._formattedAddress = formattedAddress;
  }

}
