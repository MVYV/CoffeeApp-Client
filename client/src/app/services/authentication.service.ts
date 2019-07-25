import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/users.model";
import { UserRegistrationService } from "./user-registration.service";
import { map } from "rxjs/operators";

@Injectable()
export class AuthenticationService {

  loggedInUser: any;

  constructor( private http: HttpClient) { }

  authenticate(username, password) {
    console.log(username);
    console.log(password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.http.get<User>('https://march11app.herokuapp.com/login', {headers}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicAuth', authString);
          this.loggedInUser = username;
          return userData;
        }
      )
    );
  }

  isLoggedIn() {
    let user = sessionStorage.getItem('username');
    // console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

}
