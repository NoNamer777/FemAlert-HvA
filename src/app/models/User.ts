export class User {
  private _id: string = null;
  private _name: string = null;
  private _emailAddress: string;
  private _password: string;
  private _admin: boolean = null;

  constructor(emailAddress?: string, password?: string){
    this._emailAddress = emailAddress;
    this._password = password;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set password(value: string) {
    this._password = value;
  }

  get admin(): boolean {
    return this._admin;
  }
}
