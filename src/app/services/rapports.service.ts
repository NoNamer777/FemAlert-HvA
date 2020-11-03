import { Injectable } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SessionStorageService } from './session-storage.service';
import { Rapport } from '../models/Rapport';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class RapportsService {

  get isCreatingRapport(): boolean {
    return this._isCreatingRapport;
  }

  set isCreatingRapport(isCreatingRapport: boolean) {
    if (this._isCreatingRapport === isCreatingRapport) return;

    this._isCreatingRapport = coerceBooleanProperty(isCreatingRapport);

    if (!this.isCreatingRapport) this.rapport = null;

    this.sessionStorageService.updateSessionData('isCreatingRapport', this._isCreatingRapport);
  }

  private _isCreatingRapport = false;

  get rapport(): Rapport {
    return this._rapport;
  }

  set rapport(rapport: Rapport) {
    this._rapport = rapport;

    this.sessionStorageService.updateSessionData('rapport', this.rapport);
  }

  private _rapport: Rapport = null;

  constructor(private sessionStorageService: SessionStorageService) {
    const sessionData = this.sessionStorageService.getData;

    if (sessionData != null && sessionData.isCreatingRapport != null) {
      this.isCreatingRapport = sessionData.isCreatingRapport;

      if (this.isCreatingRapport && sessionData.rapport != null) {
        const sessionRapport = new Rapport();

        sessionRapport.address =
          new Address(sessionData.rapport.address.formattedAddress, sessionData.rapport.address.businessName);

        this.rapport = sessionRapport;
      }
    }
  }
}
