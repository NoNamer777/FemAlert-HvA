import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  get getData(): any {
    return this._data;
  }

  private readonly _data: any = null;

  constructor() {
    const dataRaw: string = sessionStorage.getItem('fem-alert');

    if (dataRaw == null || dataRaw === '{}') this._data = {};
    else this._data = JSON.parse(dataRaw);
  }

  updateSessionData(key: string, value: any): void {
    if (value != null) this._data[key] = value;
    else delete this._data[key];

    sessionStorage.setItem('fem-alert', JSON.stringify(this.serializeData(this._data)));
  }

  private serializeData(data): any {
    const serialized = {};

    for (const key in data) {

      if (data.hasOwnProperty(key)) {
        const serializedKey = key.replace('_', '');

        if (typeof data[key] === 'object' && data[key] != null) serialized[serializedKey] = this.serializeData(data[key]);
        else serialized[serializedKey] = data[key];
      }
    }
    return serialized;
  }
}
