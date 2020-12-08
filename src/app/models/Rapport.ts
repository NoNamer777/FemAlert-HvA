import { Address } from './Address';
import { Event } from './Event';

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

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(emailAddress: string) {
    this._emailAddress = emailAddress;
  }

  private _emailAddress: string = null;

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  private _name: string = null;

  get events(): Event[] {
    return this._events;
  }

  private _events: Event[] = [];

  get dateTime(): string {
    return this._dateTime;
  }

  set dateTime(dateTime: string) {
    this._dateTime = dateTime?.toString().replace('T', ' ');
  }

  private _dateTime: string;

  get story(): string {
    return this._story;
  }

  set story(story: string) {
    this._story = story;
  }

  private _story: string = null;

  get requiresSupport(): boolean {
    return this._requiresSupport;
  }

  set requiresSupport(requiresSupport: boolean) {
    this._requiresSupport = requiresSupport;
  }

  private _requiresSupport = false;

  get wantsExtraInfo(): boolean {
    return this._wantsExtraInfo;
  }

  set wantsExtraInfo(wantsExtraInfo: boolean) {
    this._wantsExtraInfo = wantsExtraInfo;
  }

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
    this.dateTime = dateTime;
    this.story = story;
    this.requiresSupport = requiresSupport;
    this.wantsExtraInfo = wantsExtraInfo;

    this.address = address == null ? null : new Address(address.formattedAddress, address.businessName);

    this._events = [];
  }

  addEvent(event: Event): boolean {
    let hasBeenAdded = true;

    for (const entry of this.events) {
      if (entry.id === event.id) {
        hasBeenAdded = false;
        break;
      }
    }

    if (!hasBeenAdded) return hasBeenAdded;
    this._events.push(event);
    this._events.sort((o1: Event, o2: Event) => o1.name.localeCompare(o2.name));

    return hasBeenAdded;
  }

  removeEvent(event: Event): boolean {
    this.events.forEach((entry: Event, index: number) => {
      if (entry.id === event.id) {
        this.events.splice(index, 1);
        return true;
      }
    });

    return false;
  }

  clearEvents(): void {
    this._events = [];
  }
}
