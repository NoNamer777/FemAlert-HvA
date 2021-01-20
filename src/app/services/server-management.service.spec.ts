import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {
  ENTITY_STORAGE_KEY,
  EntityProperty,
  ServerManagementService,
  TYPE_STORAGE_KEY
} from './server-management.service';
import { BACK_END_URL } from './questions.service';

describe('ServerManagementService', () => {

  const entity = { id: 'I', name: 'Am', removable: true, active: false };

  let service: ServerManagementService;
  let httpClientMock: HttpTestingController;

  function initializeServices(): void {
    service = TestBed.inject(ServerManagementService);
    httpClientMock = TestBed.inject(HttpTestingController);
  }

  function requestEmptyArray(): void {
    const fetchEntitiesReq = httpClientMock.expectOne(`${BACK_END_URL}/${service.type.value.toLocaleLowerCase()}`);

    fetchEntitiesReq.flush([]);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
  });

  afterEach(() => {
    sessionStorage.clear();
    httpClientMock.verify();
  });

  it('should initialize with default values', () => {
    initializeServices();

    expect(service.type).toEqual({ name: 'Incident', value: 'Event' });

    requestEmptyArray();

    expect(service.entity).toBeNull();
  });

  it('should initialize with session values', () => {
    const entityType = { name: 'Organisatie', value: 'Organisation' };

    sessionStorage.setItem('fem-alert', JSON.stringify({
      [TYPE_STORAGE_KEY]: entityType,
      [ENTITY_STORAGE_KEY]: {},
    }));
    initializeServices();

    expect(service.type).toEqual(entityType);

    requestEmptyArray();

    expect(service.entity).not.toBeNull();
  });

  it('should not set an entity type that is not managed by the server', () => {
    initializeServices();
    requestEmptyArray();

    service.type = { name: 'Test', value: 'nothing special' };

    spyOn(httpClientMock, 'expectNone');

    // Expecting the first entity type because that was set by default during service construction
    expect(service.type).toEqual({ name: 'Incident', value: 'Event' });

    httpClientMock.expectNone(`${BACK_END_URL}/${service.type.value.toLocaleLowerCase()}`);
    expect(httpClientMock.expectNone).not.toThrowError();
  });

  it('should no set an entity type that was already selected', () => {
    initializeServices();
    requestEmptyArray();

    const entityType = { name: 'Organisatie', value: 'Organisation' };

    service.type = entityType;
    requestEmptyArray();

    spyOn(httpClientMock, 'expectNone');

    service.type = entityType;
    // Trying to set the type to the same type again should not do anyting, thus no sending the request.
    httpClientMock.expectNone(`${BACK_END_URL}/${service.type.value.toLocaleLowerCase()}`);
    expect(httpClientMock.expectNone).not.toThrowError();
  });

  it('should no set the same entity when it is already set', () => {
    initializeServices();
    requestEmptyArray();

    service.entity = entity;

    expect(service.entity).not.toBeNull();

    spyOn(service.entityChange, 'next');

    service.entity = entity;

    expect(service.entityChange.next).not.toHaveBeenCalled();

  });

  it('should check if the service has an entity as value', () => {
    initializeServices();
    requestEmptyArray();

    expect(service.hasSelected()).toBeFalse();

    service.entity = entity;

    expect(service.hasSelected()).toBeTrue();
  });

  it('should check if the service has a specific entity as value', () => {
    initializeServices();
    requestEmptyArray();

    expect(service.hasSelected(entity)).toBeFalse();

    service.entity = entity;

    expect(service.hasSelected(entity)).toBeTrue();
  });

  it('should check if a text value is part of the selected entity type properties', () => {
    initializeServices();
    requestEmptyArray();

    expect(service.hasProperty('admin')).toBeFalse();
    expect(service.hasProperty('dungeonMaster')).toBeFalse();
    expect(service.hasProperty('removable')).toBeTrue();
    expect(service.hasProperty('id')).toBeTrue();
  });

  it('should check if the service entity is a new entity', () => {
    initializeServices();
    requestEmptyArray();

    expect(service.isNewEntity()).toBeFalse();

    service.entity = entity;

    expect(service.isNewEntity()).toBeFalse();

    service.entity = {};

    expect(service.isNewEntity()).toBeTrue();
  });

  it('should check if a specific entity is a new entity', () => {
    initializeServices();
    requestEmptyArray();

    expect(service.isNewEntity(entity)).toBeFalse();
    expect(service.isNewEntity({})).toBeTrue();
  });

  it('should return the name of the property', () => {
    initializeServices();
    requestEmptyArray();

    const simplePropertyName = 'property';
    const complicatedProperty = {
      name: 'events',
      value: 'Event',
    };

    expect(service.propertyName(simplePropertyName)).toBe(simplePropertyName);
    expect(service.propertyName(complicatedProperty as unknown as EntityProperty)).toBe(complicatedProperty.name);
  });

  it('should select an entity type by type name', () => {
    initializeServices();
    requestEmptyArray();

    let typeName = 'Organisatie';

    expect(service.type.name).not.toBe(typeName);

    service.selectTypeByName(typeName);

    requestEmptyArray();

    expect(service.type.name).toBe(typeName);

    typeName = 'Test Type';

    service.selectTypeByName(typeName);

    expect(service.type.name).not.toBe(typeName);

    spyOn(httpClientMock, 'expectNone');

    httpClientMock.expectNone(`${BACK_END_URL}/${service.type.value.toLocaleLowerCase()}`);
    expect(httpClientMock.expectNone).not.toThrowError();
  });

  it('should add and select a new entity', () => {
    initializeServices();
    requestEmptyArray();

    service.createNewEntity();

    expect(service.entities.length).toBe(1);
    expect(service.entities[0]).toEqual(service.entity);
  });
});
