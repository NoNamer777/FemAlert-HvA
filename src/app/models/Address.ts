export class Address {

  get businessName(): string {
    return this._businessName;
  }

  private readonly _businessName: string = null;

  get formattedAddress(): string {
    return this._formattedAddress;
  }

  private readonly _formattedAddress: string = null;

  constructor(formattedAddress: string, businessName?: string) {

    if (businessName != null) this._businessName = businessName;
    this._formattedAddress = formattedAddress;
  }

}
