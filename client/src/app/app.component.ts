import { Component, OnInit } from '@angular/core';
import { TranslateService } from "./services/translate.service";
import { AuthenticationService } from "./services/authentication.service";
import { User } from './models/users.model';
import { Role } from './models/roles.model';
import { UserRegistrationService } from './services/user-registration.service';
import { GlobalVariablesService } from './services/global-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  navLinkTitle: string;
  authenticateUser: User;
  userRoleArr: any;
  public userRole: any;
  roles: Role[];

  constructor( private translate: TranslateService,
               public authenticationService: AuthenticationService,
               private registrationService: UserRegistrationService,
               private globalVariables: GlobalVariablesService) {}

  ngOnInit() {
    this.authenticateUser = new User();
    this.checkLoggedInUser();
  }

  setLanguage(lang: string) {
    localStorage.setItem('translationLang', lang);
    this.translate.use(localStorage.getItem('translationLang'));
    this.globalVariables.siteLanguage = lang;
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
        sessionStorage.setItem('userRole', this.userRole);
        localStorage.setItem('userRole', this.userRole);
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

  pageReload() {
    window.location.reload();
  }
}
