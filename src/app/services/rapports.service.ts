import { Injectable } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';

import { SessionStorageService } from './session-storage.service';
import { Rapport } from '../models/Rapport';
import { Address } from '../models/Address';
import { Observable } from 'rxjs';
import { BACK_END_URL } from './questions.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RapportsService {

  private _isCreatingRapport = false;

  private _rapport: Rapport = null;

  constructor(private sessionStorageService: SessionStorageService, private httpClient: HttpClient) {
    const sessionData = this.sessionStorageService.getData;

    if (sessionData != null && sessionData.isCreatingRapport != null) {
      this.isCreatingRapport = sessionData.isCreatingRapport;

      if (this.isCreatingRapport && sessionData.rapport != null) {
        const sessionRapport = new Rapport(
          sessionData.rapport.id,
          null,
          sessionData.rapport.emailAddress,
          sessionData.rapport.name,
          sessionData.rapport.events,
          sessionData.rapport.dateTime,
          sessionData.rapport.story,
          sessionData.rapport.requiresSupport,
          sessionData.rapport.wantsExtraInfo
        );

        sessionRapport.address =
          new Address(sessionData.rapport.address.formattedAddress, sessionData.rapport.address.businessName);

        this.rapport = sessionRapport;
      }
    }
  }

  sendRapport(rapport: object): Observable<Rapport> {
    return this.httpClient.post<any>(`${BACK_END_URL}/rapport`, rapport)
      .pipe(map((result: any) => new Rapport(
        result.id,
        result.address,
        result.emailAddress,
        result.name,
        result.events,
        result.dateTime,
        result.story,
        result.requiresSupport,
        result.wantsExtraInfo
      )
    ));
  }

  get isCreatingRapport(): boolean {
    return this._isCreatingRapport;
  }

  set isCreatingRapport(isCreatingRapport: boolean) {
    if (this._isCreatingRapport === isCreatingRapport) return;

    this._isCreatingRapport = coerceBooleanProperty(isCreatingRapport);

    if (!this.isCreatingRapport) this.rapport = null;

    this.sessionStorageService.updateSessionData('isCreatingRapport', this._isCreatingRapport);
  }

  get rapport(): Rapport {
    return this._rapport;
  }

  set rapport(rapport: Rapport) {
    this._rapport = rapport;

    this.sessionStorageService.updateSessionData('rapport', this.rapport);
  }
}
