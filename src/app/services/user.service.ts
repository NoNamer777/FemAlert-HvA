import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { BACK_END_URL } from './questions.service';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private AUTHENTICATE_URL = '/authenticate';
  private LOGIN_URL = '/login';
  private REGISTER_URL = '/register';

  constructor(private httpClient: HttpClient,
              private serializer: SessionStorageService) { }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(
      BACK_END_URL + this.AUTHENTICATE_URL + this.LOGIN_URL,
      this.serializer.serializeData(user)
    );
  }
}
