import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { BACK_END_URL } from './questions.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient,
              private sessionStorageService: SessionStorageService) {}

  /**
   * Sends get request to get all Users in database
   */
  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(
      `${BACK_END_URL}/user`
    );
  }

  /**
   * Sends delete request to delete User with chosen id
   * @param id is id of User to delete
   */
  deleteUser(id: string): Observable<any> {
    return this._httpClient.delete(`${BACK_END_URL}/user/${id}`);
  }

  /**
   * Sends put request to update User information of already existing User
   * @param user is User to update
   */
  updateUser(user: User): Observable<any> {
    return this._httpClient.put(
      `${BACK_END_URL}/user/${user.id}`,
      this.sessionStorageService.serialize(user)
    );
  }
}
