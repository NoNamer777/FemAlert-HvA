import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { BACK_END_URL } from './questions.service';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient,
              private _autenticateService: AuthenticateService) {}

  /**
   * Sends get request to get all users in database
   */
  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(
      `${BACK_END_URL}/user`
    );
  }

  deleteUser(id: string): Observable<any> {
    return this._httpClient.delete(`${BACK_END_URL}/user/${id}`);
  }
}
