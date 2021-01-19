import { Injectable } from '@angular/core';
import ServerEntities from '../../assets/data/server-entities.json';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { BACK_END_URL } from './questions.service';
import { Subject } from 'rxjs';
import EntityProperties from '../../assets/data/entity-properties.json';

export interface ServerEntity {

  name: string;

  value: string;
}

export interface EntityProperty {

  name: string;

  type: string;
}

const TYPE_STORAGE_KEY = 'sm-type';
const ENTITY_STORAGE_KEY = 'sm-entity';

@Injectable({
  providedIn: 'root'
})
export class ServerManagementService {

  serverEntities: ServerEntity[] = ServerEntities;

  entityProperties: { [p: string ]: (string | EntityProperty)[] } = EntityProperties;

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

    if (this.entity != null && this.entity.id == null) {
      this.entities.push(this.entity);
    }
  }

  private _entities: any[] = [];

  get entity(): any {
    return this._entity;
  }

  set entity(entity: any) {
    entity = this._sessionStorageService.deserialize(entity, this.type.value);

    if (this.entity != null && entity === this._entity) return;

    this._entity = entity;
    this.entityChange.next(this.entity);

    this._sessionStorageService.updateSessionData(ENTITY_STORAGE_KEY, this._entity);
  }

  private _entity: any = null;

  constructor(
    private _sessionStorageService: SessionStorageService,
    private _httpClient: HttpClient
  ) {
    const sessionType = _sessionStorageService.getSessionData(TYPE_STORAGE_KEY);
    const sessionEntity = _sessionStorageService.getSessionData(ENTITY_STORAGE_KEY);

    this.type = sessionType == null ?
      this.serverEntities[0] :
      sessionType;

    if (sessionEntity) this.entity = sessionEntity;
  }

  hasSelected(entity?: any): boolean {
    if (entity == null) return !(this.entity == null);

    return this.entity?.id === entity.id;
  }

  hasProperty(attribute: string): boolean {
    const properties = this.entityProperties[this.type.value];

    for (const prop of properties) {
      const property = this.propertyName(prop);

      if (property === attribute) return true;
    }

    return false;
  }

  isNewEntity(entity?: any): boolean {
    return entity == null ? this.entity != null && this.entity.id == null : entity.id == null;
  }

  propertyName(property: string | EntityProperty): string {
    return this._isSimpleProperty(property) ? property as string : (property as EntityProperty).name;
  }

  selectTypeByName(typeName: string): void {
    for (const typeEntry of this.serverEntities) {
      if (typeName === typeEntry.name) {
        this.type = typeEntry;
        break;
      }
    }
  }

  createNewEntity(): void {
    const entity = this._sessionStorageService.deserialize({}, this.type.value);

    this.entities.push(entity);
    this.entity = entity;
  }

  deleteOrReplaceLocally(replaceWith?: any): void {
    let index = -1;

    for (let idx = 0; idx < this.entities.length; idx++) {
      const entry = this.entities[idx];

      if (entry.id === this.entity.id) {
        index = idx;

        break;
      }
    }

    if (!!replaceWith) {
      this.entities.splice(index, 1, replaceWith);

      this.entity = replaceWith;

      return;
    }

    this.entities.splice(index, 1);

    this._entity = null;
    this._sessionStorageService.updateSessionData(ENTITY_STORAGE_KEY, null);
  }

  deleteFromRemote(): void {
    this._httpClient.delete(`${BACK_END_URL}/${this.type.value.toLocaleLowerCase()}/${this.entity.id}`).subscribe(
      () => this.deleteOrReplaceLocally(),
      error => {
        console.error(error);

        alert('Er ging iets mis tijdens het verwijderen van het geselecteerde object, meer info in de logs.');
    });
  }

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

  private _findEntityType(type: ServerEntity): boolean {
    for (const typeEntry of this.serverEntities) {
      if (type.name === typeEntry.name) return true;
    }

    return false;
  }

  private _isSimpleProperty(property: string | EntityProperty): boolean {
    return typeof property === 'string';
  }
}
