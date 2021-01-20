import { Injectable } from '@angular/core';
import * as Entities from '../models/Entities';
import EntityProperties from '../../assets/data/entity-properties.json';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  get getData(): any {
    return this._data;
  }

  private _data: any = null;

  constructor() {
    const dataRaw: string = sessionStorage.getItem('fem-alert');

    if (dataRaw == null || dataRaw === '{}') this._data = {};
    else this._data = JSON.parse(dataRaw);
  }

  /**
   * Updates sessions storage
   */
  updateSessionData(key: string, value: any): void {
    if (value != null) this._data[key] = value;
    else delete this._data[key];

    sessionStorage.setItem('fem-alert', JSON.stringify(this.serialize(this._data)));
  }

  /**
   * Clears session storage and _data
   */
  clearSessionData(): void {
    this._data = {};

    sessionStorage.setItem('fem-alert', this.serialize(this._data));
  }

  /**
   * Gets needed data searched with key
   * @param key is key to search data with
   */
  getSessionData(key: string): any{
    return this._data[key];
  }

  serialize(data: any): any {
    const serialized = {};

    for (const key in data) {
      const serializedKey = key.replace('_', '');

      if (data[key] instanceof Array) {
        const array = [];

        for (const entry of data[key]) array.push(this.serialize(entry));
        serialized[serializedKey] = array;
      }
      else if (typeof data[key] === 'object' && data[key] != null) {
        serialized[serializedKey] = this.serialize(data[key]);
      }
      else serialized[serializedKey] = data[key];
    }
    return serialized;
  }

  /**
   * Types multiple raw json objects into typed entity objects of the provided type.
   */
  deserializeAll<E>(data: any[], type: string): E[] {
    const entities: E[] = [];

    for (const dataObject of data) entities.push(this.deserialize<E>(dataObject, type));
    return entities;
  }

  /**
   * Types a raw json object into a typed object of the provided type.
   */
  deserialize<E>(data: any, type: string): E {
    const typedEntity = new Entities[type]();
    const properties = EntityProperties[type];

    for (const prop of properties) {
      const isTyped = typeof prop === 'string';
      const property = !isTyped ? prop.name : prop;
      const value = data[property];

      // Don't add null values to the typed object result, because they don't add value anyway.
      if (value != null) {
        // Handles simple values.
        if (['string', 'boolean', 'number'].includes(typeof value)) {
          typedEntity[property] = value;
        }

        // Handles array values.
        else if (value instanceof Array) {
          const addTypedArrayValueFunctionName = `add${prop.type}`;

          for (const entry of value) {
            typedEntity[addTypedArrayValueFunctionName](this.deserialize(entry, prop.type));
          }
        }

        // Handles object values.
        else {
          typedEntity[property] = this.deserialize(value, prop.type);
        }
      }
    }
    return typedEntity;
  }
}
