import { TestBed } from '@angular/core/testing';

import { RapportsService } from './rapports.service';
import { Rapport } from '../models/Rapport';
import { Address } from '../models/Address';

describe('RapportsService', () => {
  let service: RapportsService;
  let store: any;

  const EXPECTED_ADDRESS = new Address('localhost-8080', 'Made you look');
  const EXPECTED_RAPPORT = new Rapport();
  EXPECTED_RAPPORT.address = EXPECTED_ADDRESS;

  const EXPECTED_ADDRESS_OBJECT = {
    id: EXPECTED_RAPPORT.id,
    address: {
      formattedAddress: EXPECTED_RAPPORT.address.formattedAddress,
      businessName: EXPECTED_RAPPORT.address.businessName
    }
  };

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

  it('should be initialize properties with default values', () => {
    service = TestBed.inject(RapportsService);

    expect(service.isCreatingRapport).toBe(false);
    expect(service.rapport).toBe(null);
  });

  it('should be initialize properties with session storage data values', () => {
    sessionStorage.setItem('fem-alert', JSON.stringify({ isCreatingRapport: true, rapport: EXPECTED_ADDRESS_OBJECT }));

    service = TestBed.inject(RapportsService);

    expect(service.isCreatingRapport).toBe(true);
    expect(service.rapport).toEqual(EXPECTED_RAPPORT);
  });

  it(`should be initialize 'isCreatingRapport' with session storage data values`, () => {
    sessionStorage.setItem('fem-alert', JSON.stringify({ isCreatingRapport: true }));

    service = TestBed.inject(RapportsService);

    expect(service.isCreatingRapport).toBe(true);
    expect(service.rapport).toBe(null);
  });

  it(`should update 'isCreatingRapport' variable`, () => {
    service = TestBed.inject(RapportsService);

    service.isCreatingRapport = true;

    const storageData = JSON.parse(sessionStorage.getItem('fem-alert'));

    expect(storageData.isCreatingRapport).toBe(true);
    expect(storageData.rapport).toBe(undefined);
  });

  it(`should update 'isCreatingRapport' only once`, () => {
    expect(sessionStorage.setItem).toHaveBeenCalledTimes(0);

    service = TestBed.inject(RapportsService);

    service.isCreatingRapport = true;

    expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);

    service.isCreatingRapport = true;

    expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it(`should reset 'rapport' when resetting 'isCreatingRapport`, () => {
    service = TestBed.inject(RapportsService);

    service.isCreatingRapport = true;
    service.isCreatingRapport = false;

    expect(service.rapport).toBe(null);
  });
});
