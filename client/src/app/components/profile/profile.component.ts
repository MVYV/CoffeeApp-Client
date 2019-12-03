import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  authenticateUser: User;
  isSuccess: boolean = false;
  isError: boolean = false;
  isCorrectPass: boolean = false;
  repeatPassword: any;

  getAuthSubscription: Subscription;
  putAuthSubscription: Subscription;

  constructor(
    private pageTitle: PageTitleService,
    private registrationService: UserRegistrationService ) { }

  ngOnInit() {
    this.authenticateUser = new User();
    this.pageTitle.setTitle('Coffee Products - Profile');
    this.checkLoggedInUser();
  }

  ngOnDestroy() {
    if (this.getAuthSubscription) {this.getAuthSubscription.unsubscribe();}
    if (this.putAuthSubscription) {this.putAuthSubscription.unsubscribe();}
  }

  loadUserData() {
    let userMail: any = sessionStorage.getItem('username');
    this.getAuthSubscription = this.registrationService.getAuthenticatedUser(userMail).subscribe(
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
    this.putAuthSubscription = this.registrationService.putUser(this.authenticateUser).subscribe(
      () => {
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
        this.loadUserData();
      }, () => {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
        this.loadUserData();
      }
    )
  }

  checkPass(event) {
    let passField: any = document.getElementById('user-pass');
    this.isCorrectPass = event.target.value == passField.value;
  }

}
