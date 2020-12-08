import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';
import * as Entities from '../models/Entities';
import EntityProperties from '../../assets/data/entity-properties.json';
import { User } from '../models/User';
import { Rapport } from '../models/Rapport';

describe('SessionStorageService', () => {
  let service: SessionStorageService;
  let store: any;

  const mockSessionStorage = {
    getItem: (key: string): string => key in store ? store[key] : null,
    setItem: (key: string, value: string) => store[key] = `${value}`,
    removeItem: (key: string) => delete store[key],
    clear: () => store = {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = {};

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);
  });

  it('should instantiate the session storage data correctly with no data', () => {
    service = TestBed.inject(SessionStorageService);

    // tslint:disable-next-line:no-string-literal
    expect(service['_data']).toEqual({});
  });

  it('should instantiate the session storage data correctly with data', () => {
    sessionStorage.setItem('fem-alert', JSON.stringify({ }));

    service = TestBed.inject(SessionStorageService);

    // tslint:disable-next-line:no-string-literal
    expect(service['_data']).toEqual({});
  });

  it('should get the current session storage data', () => {
    sessionStorage.setItem('fem-alert', JSON.stringify({ test: false }));

    service = TestBed.inject(SessionStorageService);

    expect(service.getData).toEqual({ test: false });
  });

  it('should update data', () => {
    service = TestBed.inject(SessionStorageService);

    expect(service.getData).toEqual({});

    service.updateSessionData('test1', 'value');
    service.updateSessionData('test2', 1);
    service.updateSessionData('test3', { deepTest: { extraDeep: true } });

    expect(service.getData).toEqual({ test1: 'value', test2: 1, test3: { deepTest: { extraDeep: true } } });

    service.updateSessionData('test1', null);

    expect(service.getData).toEqual({ test2: 1, test3: { deepTest: { extraDeep: true } } });
  });

  it('should get a specific storage data', () => {
    const EXPECTED_VALUE = 101;

    service = TestBed.inject(SessionStorageService);
    service.updateSessionData('Test', EXPECTED_VALUE);

    const FINAL_VALUE = service.getSessionData('Test');
    expect(FINAL_VALUE).toEqual(EXPECTED_VALUE);
  });

  it('should type a single json object into a Typescript object.', () => {
    service = TestBed.inject(SessionStorageService);

    const objectProperties = EntityProperties.User;
    const jsonObject = {
      id: 'USR-001',
      name: 'generic username',
      emailAddress: 'generic_username@gmail.com',
      password: 'easy2Hack1234!',
      admin: false,
    };

    // tslint:disable-next-line:no-string-literal
    expect(Entities['User']).toBeDefined();
    expect(objectProperties).toBeDefined();

    const typedObject = service.deserialize(jsonObject, 'User');

    expect(typedObject instanceof User).toBe(true);

    for (const property of objectProperties) expect(typedObject[property]).toBe(jsonObject[property]);
  });

  it('should type an array of json objects into a Typescript objects.', () => {
    service = TestBed.inject(SessionStorageService);

    const objectProperties = EntityProperties.Rapport;
    const jsonObjects = [
      {
        id: 'RPT-001',
        address: {
          businessName: null,
          formattedAddress: 'Amsterdam'
        },
        emailAddress: 'generic_user_foo@gmail.com',
        name: null,
        events: [
          {
            id: 'EVT-003',
            name: 'Aangerand',
            active: true,
            removable: true,
          },
          {
            id: 'EVT-001',
            name: 'Uitgescholden',
            active: true,
            removable: true,
          },
        ],
        dateTime: new Date().toISOString().replace('T', ' '),
        story: null,
        requiresSupport: false,
        wantsExtraInfo: true,
      },
      {
        id: 'RPT-002',
        address: {
          businessName: null,
          formattedAddress: 'Amsterdam'
        },
        emailAddress: 'generic_user_bar@gmail.com',
        name: 'generic user bar',
        events: [
          {
            id: 'EVT-001',
            name: 'Uitgescholden',
            active: true,
            removable: true,
          },
          {
            id: 'EVT-002',
            name: 'verkracht',
            active: true,
            removable: true,
          }
        ],
        dateTime: new Date().toISOString().replace('T', ' '),
        story: null,
        requiresSupport: true,
        wantsExtraInfo: true,
      }
    ];

    // tslint:disable-next-line:no-string-literal
    expect(Entities['Rapport']).toBeDefined();
    expect(objectProperties).toBeDefined();

    const typedObjects = service.deserializeAll(jsonObjects, 'Rapport');

    expect(typedObjects instanceof Array).toBe(true);
    expect(typedObjects[0] instanceof Rapport).toBe(true);
    expect(typedObjects[1] instanceof Rapport).toBe(true);

    for (let index = 0; index < jsonObjects.length; index++) {
      const typedObject = typedObjects[index];
      const jsonObject = jsonObjects[index];

      for (const prop of objectProperties) {
        const property = typeof prop === 'string' ? prop : prop.name;

        if (['string', 'number', 'boolean'].includes(typeof typedObject[property])) {
          expect(typedObject[property]).toEqual(jsonObject[property]);
        }

        else if (typedObject[property] instanceof Array) {
          expect(typedObject[property].length).toBe(jsonObject[property].length);
        }
      }
    }
  });
});
