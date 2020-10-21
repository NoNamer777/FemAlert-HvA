import { Address } from './Address';

export class Rapport {

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  private _id: string = null;

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  private _address: Address = null;

  constructor() {}
}
