import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RapportsService } from './rapports.service';
import { Rapport } from '../models/Rapport';
import { Address } from '../models/Address';
import { BACK_END_URL } from './questions.service';

describe('RapportsService', () => {
  let service: RapportsService;
  let store: any;

  let mockHttpClient: HttpTestingController;

  const EXPECTED_RAPPORT = {
    id: null,
    address: {
      formattedAddress: 'localhost-8080',
      businessName: 'Made you look'
    },
    emailAddress: 'dummy@gmail.com',
    name: null,
    events: [],
    dateTime: new Date().toString(),
    story: null,
    requiresSupport: false,
    wantsExtraInfo: false
  };

  const mockSessionStorage = {
    getItem: (key: string): string => key in store ? store[key] : null,
    setItem: (key: string, value: string) => store[key] = `${value}`,
    removeItem: (key: string) => delete store[key],
    clear: () => store = {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    store = {};
    mockHttpClient = TestBed.inject(HttpTestingController);

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
    const mockRapport = new Rapport(
      EXPECTED_RAPPORT.id,
      new Address(EXPECTED_RAPPORT.address.formattedAddress, EXPECTED_RAPPORT.address.businessName),
      EXPECTED_RAPPORT.emailAddress,
      EXPECTED_RAPPORT.name,
      EXPECTED_RAPPORT.events,
      EXPECTED_RAPPORT.dateTime,
      EXPECTED_RAPPORT.story,
      EXPECTED_RAPPORT.requiresSupport,
      EXPECTED_RAPPORT.wantsExtraInfo
    );

    sessionStorage.setItem('fem-alert', JSON.stringify({ isCreatingRapport: true, rapport: EXPECTED_RAPPORT }));

    service = TestBed.inject(RapportsService);

    expect(service.isCreatingRapport).toBe(true);
    expect(service.rapport).toEqual(mockRapport);
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

  it('should send a rapport to the back-end', () => {
    const mockRapport = new Rapport(
      EXPECTED_RAPPORT.id,
      new Address(EXPECTED_RAPPORT.address.formattedAddress, EXPECTED_RAPPORT.address.businessName),
      EXPECTED_RAPPORT.emailAddress,
      EXPECTED_RAPPORT.name,
      EXPECTED_RAPPORT.events,
      EXPECTED_RAPPORT.dateTime,
      EXPECTED_RAPPORT.story,
      EXPECTED_RAPPORT.requiresSupport,
      EXPECTED_RAPPORT.wantsExtraInfo
    );

    service = TestBed.inject(RapportsService);

    service.sendRapport(EXPECTED_RAPPORT).subscribe((rapport: Rapport) => {
      expect(rapport).toEqual(mockRapport);
    });

    const saveRapportRequest = mockHttpClient.expectOne(`${BACK_END_URL}/rapport`);

    saveRapportRequest.flush(EXPECTED_RAPPORT);

    expect(saveRapportRequest.request.method).toEqual('POST');
  });
});
