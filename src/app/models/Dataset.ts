export class Dataset {

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  private _id: string;

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  private _name: string;

  get basis(): string {
    return this._basis;
  }

  set basis(basis: string) {
    this._basis = basis;
  }

  private _basis: string;

  get discriminator(): string {
    return this._discriminator;
  }

  set discriminator(discriminator: string) {
    this._discriminator = discriminator;
  }

  private _discriminator: string;

  constructor() {}
}
