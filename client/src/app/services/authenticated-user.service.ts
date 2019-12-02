import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {

  authenticatedUser: User;
  userRolesArr: any;
  userRoleData: any;

  constructor( private http: HttpClient ) { }

  getAuthenticatedUser() {
    this.http.get<User>(`https://march11app.herokuapp.com/email/${sessionStorage.getItem('username')}`).subscribe(
      userData => {
        this.authenticatedUser = userData;
        this.userRolesArr = this.authenticatedUser.roles;
        this.userRoleData = this.userRolesArr[0].role;
        return this.userRoleData == 'ADMIN' || this.userRoleData == 'MODERATOR';
      },
      () => {}
    );
  }
}
