import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/users.model";
import { UserRegistrationService } from "./user-registration.service";
import { map } from "rxjs/operators";

@Injectable()
export class AuthenticationService {

  constructor( private http: HttpClient) { }

  authenticate(username, password) {
    return this.http.post<any>('https://march11app.herokuapp.com/authenticate', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenString = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenString);
          return userData;
        }
      )
    );
  }

  isLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

}
