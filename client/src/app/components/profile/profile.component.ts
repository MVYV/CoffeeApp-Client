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
  isCorrectPass: boolean = false;
  repeatPassword: any;

  constructor(
    private pageTitle: PageTitleService,
    private registrationService: UserRegistrationService ) { }

  ngOnInit() {
    this.authenticateUser = new User();
    this.pageTitle.setTitle('Coffee Products - Profile');
    this.checkLoggedInUser();
  }

  loadUserData() {
    let userMail: any = sessionStorage.getItem('username');
    this.registrationService.getAuthenticatedUser(userMail).subscribe(
      userData => {
        this.authenticateUser = userData;
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

  updateProfile() {
    let dateArr = this.authenticateUser.dateOfBirth.split('/').reverse();
    let newDateArr = [];
    newDateArr.push(dateArr[0], dateArr[2], dateArr[1]);
    let newDateString = newDateArr.join('-');
    this.authenticateUser.dateOfBirth = new Date(Date.parse(newDateString));
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

  checkPass(event) {
    let passField: any = document.getElementById('user-pass');
    this.isCorrectPass = event.target.value == passField.value;
  }

}
