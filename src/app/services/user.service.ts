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
  private AUTHENTICATE_URL = '/authenticate';
  private LOGIN_URL = '/login';
  private REGISTER_URL = '/register';

  public currentUser: User;

  constructor(private httpClient: HttpClient,
              private serializer: SessionStorageService) { }

  login(user: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<HttpResponse<User>>(
      BACK_END_URL + this.AUTHENTICATE_URL + this.LOGIN_URL,
      this.serializer.serializeData(user)
    );
  }
}
