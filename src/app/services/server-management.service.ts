import { Injectable } from '@angular/core';
import ServerEntities from '../../assets/data/server-entities.json';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { BACK_END_URL } from './questions.service';
import { Subject } from 'rxjs';
import EntityProperties from '../../assets/data/entity-properties.json';
import { isNewLine } from '@angular/compiler/src/chars';

export interface ServerEntity {

  name: string;

  value: string;
}

export interface EntityProperty {

  name: string;

  type: string;
}

export const TYPE_STORAGE_KEY = 'sm-type';
export const ENTITY_STORAGE_KEY = 'sm-entity';

@Injectable({
  providedIn: 'root'
})
export class ServerManagementService {

  /** A list of Entities that are managed by the server. */
  serverEntities: ServerEntity[] = ServerEntities;

  /** A map of properties that a type of Entity has. */
  entityProperties: { [p: string ]: (string | EntityProperty)[] } = EntityProperties;

  /** Notifies listeners that the selected Entity has changed. */
  entityChange = new Subject<any>();

  get type(): ServerEntity {
    return this._type;
  }

  set type(entity: ServerEntity) {
    if (!this._findEntityType(entity)) return;
    if (this._type != null && this._type === entity) return;

    this._type = entity;
    this._entities = [];
    this._entity = null;

    this._sessionStorageService.updateSessionData(TYPE_STORAGE_KEY, this._type);
    this._sessionStorageService.updateSessionData(ENTITY_STORAGE_KEY, null);

    this._httpClient.get(`${BACK_END_URL}/${this.type.value.toLocaleLowerCase()}`).subscribe((entities: any[]) => {
      this.entities = this._sessionStorageService.deserializeAll(entities, this.type.value);
    });
  }

  private _type: ServerEntity = null;

  get entities(): any[] {
    return this._entities;
  }

  set entities(entities: any[]) {
    this._entities = entities;

    // Adds new Entities to the list of Entities on initialization.
    if (this.entity != null && this.entity.id == null) {
      this.entities.push(this.entity);
    }
  }

  private _entities: any[] = [];

  get entity(): any {
    return this._entity;
  }

  set entity(entity: any) {
    // Type the incoming value to the appropriate Entity Type.
    entity = this._sessionStorageService.deserialize(entity, this.type.value);

    if (this.entity != null && entity?.id === this._entity?.id) return;

    this._entity = entity;
    this.entityChange.next(this.entity);

    this._sessionStorageService.updateSessionData(ENTITY_STORAGE_KEY, this._entity);
  }

  private _entity: any = null;

  constructor(
    private _sessionStorageService: SessionStorageService,
    private _httpClient: HttpClient
  ) {
    // Tries to restore data from the session storage.
    const sessionType = _sessionStorageService.getSessionData(TYPE_STORAGE_KEY);
    const sessionEntity = _sessionStorageService.getSessionData(ENTITY_STORAGE_KEY);

    this.type = sessionType == null ?
      this.serverEntities[0] :
      sessionType;

    if (!(sessionEntity == null)) this.entity = sessionEntity;
  }

  /** Checks if the provided Entity is the same Entity based on the ID. */
  hasSelected(entity?: any): boolean {
    if (entity == null) return !(this.entity == null);

    return this.entity?.id === entity.id;
  }

  /** Checks if the Entity has the provided named property. */
  hasProperty(attribute: string): boolean {
    const properties = this.entityProperties[this.type.value];

    for (const prop of properties) {
      const property = this.propertyName(prop);

      if (property === attribute) return true;
    }

    return false;
  }

  /** Checks if the selected Entity or the provided entity is a newly created Entity based on the ID. */
  isNewEntity(entity?: any): boolean {
    return entity == null ? this.entity != null && this.entity.id == null : entity.id == null;
  }

  /** Finds a property name. */
  propertyName(property: string | EntityProperty): string {
    return this._isSimpleProperty(property) ? property as string : (property as EntityProperty).name;
  }

  /** Tries to selects an Entity Type by its name property.  */
  selectTypeByName(typeName: string): void {
    for (const typeEntry of this.serverEntities) {
      if (typeName === typeEntry.name) {
        this.type = typeEntry;
        break;
      }
    }
  }

  /** Creates a new Entity from the selected Type, adds that to the list and selects it. */
  createNewEntity(): void {
    const entity = this._sessionStorageService.deserialize({}, this.type.value);

    this.entities.push(entity);
    this.entity = entity;
  }

  /**
   * Removes the selected Entity from the local list of Entities.
   * Should another Entity be provided, then the currently selected Entity is replaced with that Entity.
   */
  deleteOrReplaceLocally(replaceWith?: any): void {
    let index = -1;

    for (let idx = 0; idx < this.entities.length; idx++) {
      const entry = this.entities[idx];

      if (this.entity != null && entry.id === this.entity.id) {
        index = idx;

        break;
      }
    }

    if (index === -1) return;

    if (!!replaceWith) {
      this.entities.splice(index, 1, replaceWith);

      this.entity = replaceWith;

      return;
    }

    this.entities.splice(index, 1);

    this._entity = null;
    this._sessionStorageService.updateSessionData(ENTITY_STORAGE_KEY, null);
  }

  /** Requests the Entity to be removed from the server. */
  deleteFromRemote(): void {
    this._httpClient.delete(`${BACK_END_URL}/${this.type.value.toLocaleLowerCase()}/${this.entity.id}`).subscribe(
      () => this.deleteOrReplaceLocally(),
      error => {
        console.error(error);

        alert('Er ging iets mis tijdens het verwijderen van het geselecteerde object, meer info in de logs.');
    });
  }

  /** Requests the Entity to be saved on the server. */
  saveEntity(entityToSave: any): void {
    this._httpClient.post(
      `${BACK_END_URL}/${this.type.value.toLocaleLowerCase()}`,
      this._sessionStorageService.serialize(entityToSave)
    ).subscribe(
      () => this.deleteOrReplaceLocally(entityToSave),
      error => {
        console.error(error);

        alert('Er ging iets mis tijdens het opslaan van het geselecteerde object, meer info in de logs.');
      });
  }

  /** Requests the Entity to be update on the server. */
  updateEntity(entityToUpdate: any): void {
    this._httpClient.put(
      `${BACK_END_URL}/${this.type.value.toLocaleLowerCase()}/${this.entity.id}`,
      this._sessionStorageService.serialize(entityToUpdate)
    ).subscribe(
      () => this.deleteOrReplaceLocally(entityToUpdate),
      error => {
        console.error(error);

        alert('Er ging iets mis tijdens het bijwerken van het geselecteerde object, meer info in de logs.');
    });
  }

  /** Tries to find a specific type of Entity, returns whether the search was successful. */
  private _findEntityType(type: ServerEntity): boolean {
    for (const typeEntry of this.serverEntities) {
      if (type.name === typeEntry.name) return true;
    }

    return false;
  }

  /** Checks if the application needs to find a simple or a complex entity property. */
  private _isSimpleProperty(property: string | EntityProperty): boolean {
    return typeof property === 'string';
  }
}
