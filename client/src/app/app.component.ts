import { Component, OnInit } from '@angular/core';
import { TranslateService } from "./services/translate.service";
import { AuthenticationService } from "./services/authentication.service";
import { User } from './models/users.model';
import { Role } from './models/roles.model';
import { UserRegistrationService } from './services/user-registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  navLinkTitle: string;
  loggedIn: any;
  authenticateUser: User;
  userRoleArr: any;
  userRole: any;
  roles: Role[];

  constructor( private translate: TranslateService,
               public authenticationService: AuthenticationService,
               private registrationService: UserRegistrationService ) {}

  ngOnInit() {
    this.authenticateUser = new User();
    this.loggedIn = sessionStorage.getItem('username');
    this.checkLoggedInUser();
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  activeNavLink(linkTitle: string) {
    this.navLinkTitle = linkTitle;
  }

  loadUserData() {
    let userMail: any = sessionStorage.getItem('username');
    this.registrationService.getAuthenticatedUser(userMail).subscribe(
      userData => {
        this.authenticateUser = userData;
        this.userRoleArr = this.authenticateUser.roles;
        this.userRole = this.userRoleArr[0].role;
      }, () => {

      });
  }

  checkLoggedInUser() {
    let loggedInUser: any = sessionStorage.getItem('username');
    if (loggedInUser) {
      this.loadUserData();
    } else {

    }
  }
}
