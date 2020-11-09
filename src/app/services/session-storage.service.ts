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

  getSessionData(key: string): any{
    let storageData = JSON.parse(sessionStorage.getItem('fem-alert'));
    storageData = storageData[key];
    return storageData.toString();
  }

  public serializeData(data): any {
    const serialized = {};

    for (const key in data) {
      const serializedKey = key.replace('_', '');

      if (data[key] instanceof Array) {
        const array = [];

        for (const entry of data[key]) array.push(this.serializeData(entry));
        serialized[serializedKey] = array;
      }
      else if (typeof data[key] === 'object' && data[key] != null) {
        serialized[serializedKey] = this.serializeData(data[key]);
      }
      else serialized[serializedKey] = data[key];
    }
    return serialized;
  }
}
