import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { BACK_END_URL } from './questions.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User;

  constructor(private _httpClient: HttpClient, private _sessionStorageService: SessionStorageService) {}

  login(user: User): Observable<User> {
    return this._httpClient.post<User>(
      `${BACK_END_URL}/authenticate/login`,
      this._sessionStorageService.serialize(user)
    );
  }
}
