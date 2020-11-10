import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

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

    expect(service['_data']).toEqual({});
  });

  it('should instantiate the session storage data correctly with data', () => {
    sessionStorage.setItem('fem-alert', JSON.stringify({ }));

    service = TestBed.inject(SessionStorageService);

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
});
