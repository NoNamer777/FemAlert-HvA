import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService{
  private _token: string;
  private KEY_TOKEN = 'token';

  constructor(private httpClient: HttpClient,
              private sessionStorageService: SessionStorageService) { }

  set token(value: string) {
    this._token = value;
    this.sessionStorageService.updateSessionData(this.KEY_TOKEN, value);
  }

  get token(): string{
    return this.sessionStorageService.getSessionData(this.KEY_TOKEN);
  }
}
