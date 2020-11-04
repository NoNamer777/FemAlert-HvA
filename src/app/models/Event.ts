export class Event {

  private _id: string;

  private _name: string;

  private _active: boolean;

  private _removable: boolean;

  constructor(id?: string, name?: string, active?: boolean, removable?: boolean) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.removable = removable;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    this._active = active;
  }

  get removable(): boolean {
    return this._removable;
  }

  set removable(removable: boolean) {
    this._removable = removable;
  }
}
