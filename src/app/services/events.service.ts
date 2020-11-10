import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BACK_END_URL } from './questions.service';
import { Event } from '../models/Event';

export const MOCK_EVENTS = [
  new Event('EVT-0001', 'Gediscrimineerd', true, true),
  new Event('EVT-0002', 'Uitgescholden', true, true),
  new Event('EVT-0003', 'Agressie', true, true),
  new Event('EVT-0004', 'LHBTI', true, true),
  new Event('EVT-0005', 'Aangerand', true, true),
  new Event('EVT-0006', 'Anders', true, false),
];

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<any>(`${BACK_END_URL}/event`).pipe(map((eventObjects: any[]) => {
      const events: Event[] = [];

      // Reverse the order of event additions to place the 'anders' event as last.
      for (let idx = eventObjects.length - 1; idx >= 0; idx--) {
        const event = eventObjects[idx];

        events.push(new Event(event.id, event.name, event.active, event.removable));
      }
      return events;
    }));
  }
}
