import { Injectable } from '@angular/core';
import { User } from '../models/users.model';
import { UserRegistrationService } from './user-registration.service';

@Injectable()
export class ConstantsService {

  globalLoggedInUser: User;
  globalUserRoleArr: any;
  globalUserRole: any;

  constructor( private registrationService: UserRegistrationService ) { }

  globalLoadUserData() {
    this.globalLoggedInUser = new User();
    let userMail: any = sessionStorage.getItem('username');
    this.registrationService.getAuthenticatedUser(userMail).subscribe(
      userData => {
        this.globalLoggedInUser = userData;
        this.globalUserRoleArr = this.globalLoggedInUser.roles;
        this.globalUserRole = this.globalUserRoleArr[0].role;
      }, () => {

      });
  }
}
