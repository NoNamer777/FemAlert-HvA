import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { BACK_END_URL } from './questions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService{
  /** Bearer token from backend */
  private _token: string;

  /** Constant key for saving in storage */
  private KEY_TOKEN = 'token';

  /** Boolean to see if user is authenticated */
  public isAuthenticated = true;


  constructor(private _httpClient: HttpClient,
              private _sessionStorageService: SessionStorageService) { }

  /**
   * Sets token and saves token in storage
   * @param value is token to add to storage and service
   */
  set token(value: string) {
    this._token = value;
    this._sessionStorageService.updateSessionData(this.KEY_TOKEN, value);
  }

  /**
   * Gets token
   * @return _token if not null
   * @return _token from storage if null in service
   */
  get token(): string{
    if (this._token != null) return this._token;

    return this._sessionStorageService.getSessionData(this.KEY_TOKEN);
  }

  /**
   * Sends login request to backend retuns User object
   * @param user is user to request login
   */
  login(user: User): Observable<User> {
    return this._httpClient.post<User>(
      `${BACK_END_URL}/authenticate/login`,
      this._sessionStorageService.serialize(user)
    );
  }

  register(user: User): Observable<User> {
    return this._httpClient.post<User>(
      `${BACK_END_URL}/authenticate/register`,
      this._sessionStorageService.serialize(user)
    );
  }
}
