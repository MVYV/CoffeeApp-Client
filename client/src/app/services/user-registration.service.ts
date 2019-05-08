import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserRegistrationService {

  constructor( private http: HttpClient) { }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>('https://march11app.herokuapp.com/', user);
  }
}
