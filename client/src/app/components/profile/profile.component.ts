import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  authenticateUser: User;
  isSuccess: boolean = false;
  isError: boolean = false;

  constructor(
    private pageTitle: PageTitleService,
    private registrationService: UserRegistrationService ) { }

  ngOnInit() {
    this.authenticateUser = new User();
    this.pageTitle.setTitle('Coffee Products - Profile');
    this.loadUserData();
  }

  loadUserData() {
    let userMail: any = sessionStorage.getItem('username');
    this.registrationService.getAuthenticatedUser(userMail).subscribe(
      userData => {
        this.authenticateUser = userData;
      }, () => {

      });
  }

  updateProfile() {
    this.registrationService.putUser(this.authenticateUser).subscribe(
      () => {
        this.isSuccess = true;
        this.loadUserData();
      }, () => {
        this.isError = true;
        this.loadUserData();
      }
    )
  }

}
