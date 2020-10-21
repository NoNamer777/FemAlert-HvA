import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  updateSessionData(key: string, value: any): void {
    let data = this.getSessionData();

    if (data == null) data = {};

    if (value != null) data[key] = value;
    else delete data[key];

    sessionStorage.setItem('fem-alert', JSON.stringify(data));
  }

  getSessionData(): any {
    const data: string = sessionStorage.getItem('fem-alert');

    return data == null || data === '{}' ?
      null : JSON.parse(data);
  }
}
