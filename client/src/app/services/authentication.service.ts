import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  authenticatedUser: User;
  userRolesArr: any;
  userRoleData: any;

  constructor( private http: HttpClient) { }

  authenticate(username, password) {
    return this.http.post<any>('https://march11app.herokuapp.com/authenticate', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenString = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenString);

          this.http.get<User>(`https://march11app.herokuapp.com/email/${username}`).subscribe(
            user => {
              this.authenticatedUser = user;
              this.userRolesArr = this.authenticatedUser.roles;
              this.userRoleData = this.userRolesArr[0].role;
              sessionStorage.setItem('userRole', this.userRoleData)
            },
            () => {}
          );

          return userData;
        }
      )
    );
  }

  isLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  detectRole() {
    let role = sessionStorage.getItem('userRole');
    if (role == 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

}
