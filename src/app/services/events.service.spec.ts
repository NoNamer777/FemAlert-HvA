import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BACK_END_URL } from './questions.service';
import { Event } from '../models/Event';

const MOCK_EVENTS: any[] = [
  {
    id: 'EVT-001',
    name: 'Anders',
    active: true,
    removable: false
  },
  {
    id: 'EVT-002',
    name: 'Aangerand',
    active: true,
    removable: true
  },
  {
    id: 'EVT-003',
    name: 'Gediscrimineerd',
    active: true,
    removable: true
  },
];

describe('EventsService', () => {
  let service: EventsService;
  let mockHttpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    service = TestBed.inject(EventsService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => mockHttpClient.verify());

  it('should get events.', () => {
    service.getEvents().subscribe((events: Event[]) => {
      expect(events.length).toBe(MOCK_EVENTS.length);

      // The array data gets reversed when received.
      MOCK_EVENTS.reverse();

      for (let idx = 0; idx < events.length; idx++) {
        const event = events[idx];

        expect(event.id).toBe(MOCK_EVENTS[idx].id);
        expect(event.name).toBe(MOCK_EVENTS[idx].name);
        expect(event.active).toBe(MOCK_EVENTS[idx].active);
        expect(event.removable).toBe(MOCK_EVENTS[idx].removable);
      }
    });

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/event`);

    request.flush(MOCK_EVENTS);

    expect(request.request.method).toBe('GET');
  });
});
