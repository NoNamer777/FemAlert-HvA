import { Address } from './Address';

export class Rapport {

  private _id: string = null;

  private _address: Address = null;

  private _emailAddress: string = null;

  private _name: string = null;

  private _events: string[];

  private _dateTime: string;

  private _story: string = null;

  private _requiresSupport = false;

  private _wantsExtraInfo = false;

  constructor(
    id?: string,
    address?: Address,
    emailAddress?: string,
    name?: string,
    events?: string[],
    dateTime?: string,
    story?: string,
    requiresSupport?: boolean,
    wantsExtraInfo?: boolean
  ) {
    this.id = id;
    this.emailAddress = emailAddress;
    this.name = name;
    this.events = events;
    this.dateTime = dateTime;
    this.story = story;
    this.requiresSupport = requiresSupport;
    this.wantsExtraInfo = wantsExtraInfo;

    this.address = address == null ? null : new Address(address.formattedAddress, address.businessName);
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(emailAddress: string) {
    this._emailAddress = emailAddress;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get events(): string[] {
    return this._events;
  }

  set events(events: string[]) {
    this._events = events;
  }

  get dateTime(): string {
    return this._dateTime;
  }

  set dateTime(dateTime: string) {
    this._dateTime = dateTime?.toString().replace('T', ' ');
  }

  get story(): string {
    return this._story;
  }

  set story(story: string) {
    this._story = story;
  }

  get requiresSupport(): boolean {
    return this._requiresSupport;
  }

  set requiresSupport(requiresSupport: boolean) {
    this._requiresSupport = requiresSupport;
  }

  get wantsExtraInfo(): boolean {
    return this._wantsExtraInfo;
  }

  set wantsExtraInfo(wantsExtraInfo: boolean) {
    this._wantsExtraInfo = wantsExtraInfo;
  }
}
