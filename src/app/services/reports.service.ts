import { Injectable } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SessionStorageService } from './session-storage.service';
import { Report } from '../models/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  get isCreatingReport(): boolean {
    return this._isCreatingReport;
  }

  set isCreatingReport(isCreatingReport: boolean) {
    if (this._isCreatingReport === isCreatingReport) return;

    this._isCreatingReport = coerceBooleanProperty(isCreatingReport);

    if (!this.isCreatingReport) this.report = null;

    this.sessionStorageService.updateSessionData('isCreatingReport', this._isCreatingReport);
  }

  private _isCreatingReport = false;

  get report(): Report {
    return this._report;
  }

  set report(report: Report) {
    this._report = report;

    if (this.report == null) this.sessionStorageService.updateSessionData('report', this.report);
  }

  private _report: Report = null;

  constructor(private sessionStorageService: SessionStorageService) {
    const sessionData = this.sessionStorageService.getSessionData();

    if (sessionData != null && sessionData.isCreatingReport != null) {
      this.isCreatingReport = sessionData.isCreatingReport;
    }
  }
}
