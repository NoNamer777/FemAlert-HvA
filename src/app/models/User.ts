export class User {

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

  set name(value: string) {
    this._name = value;
  }

  private _name: string = null;

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }

  private _emailAddress: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private _password: string;

  get admin(): boolean {
    return this._admin;
  }

  set admin(value: boolean) {
    this._admin = value;
  }

  private _admin: boolean = null;

  constructor(id?: string) {
    this.id = id;
  }
}
