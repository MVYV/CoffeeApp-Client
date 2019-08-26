import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.model';
import { Role } from '../models/roles.model';
import { Mail } from '../models/mail.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserRegistrationService {

  constructor( private http: HttpClient) { }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>('https://march11app.herokuapp.com/', user);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://march11app.herokuapp.com/');
  }

  public putUser(user: User): Observable<User> {
    return this.http.put<User>(`https://march11app.herokuapp.com/${user.id}`, user);
  }

  public deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`https://march11app.herokuapp.com/${user.id}`);
  }

  public banUser(user: User): Observable<User> {
    return this.http.patch<User>(`https://march11app.herokuapp.com/${user.id}`, user);
  }

  public mailToUser(mail: Mail): Observable<Mail> {
    return this.http.post<Mail>('https://march11app.herokuapp.com/sendMail', mail);
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('https://march11app.herokuapp.com/role');
  }
}
