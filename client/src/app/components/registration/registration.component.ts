import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { Mail } from '../../models/mail.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UserRegistrationService]
})
export class RegistrationComponent implements OnInit, OnDestroy {

  newUser: User;
  repeatPassword: any;
  eCode: any;
  isCorrectCode: boolean = false;
  isCorrectPass: boolean = false;
  emailCode: any;
  mail: Mail;
  invalidLogin = false;

  postUserSubscription: Subscription;
  checkMailSubscription: Subscription;
  authSubscription: Subscription;

  constructor(
    private pageTitle: PageTitleService,
    private registrationService: UserRegistrationService,
    private authenticationService: AuthenticationService,
    private router: Router ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Registration');
    this.newUser = new User();
    this.mail = new Mail();
  }

  ngOnDestroy() {
    if (this.postUserSubscription) {this.postUserSubscription.unsubscribe();}
    if (this.checkMailSubscription) {this.checkMailSubscription.unsubscribe();}
    if (this.authSubscription) {this.authSubscription.unsubscribe();}
  }

  addNewUser() {
    let dateArr = this.newUser.dateOfBirth.split('/').reverse();
    let newDateArr = [];
    newDateArr.push(dateArr[0], dateArr[2], dateArr[1]);
    let newDateString = newDateArr.join('-');
    this.newUser.dateOfBirth = new Date(Date.parse(newDateString));
    this.postUserSubscription = this.registrationService.postUser(this.newUser).subscribe(
      () => {
      console.log('Done!!!');
      this.checkLogin();
    },() => {
      console.log('Fail(((');
    });
  }

  checkUserEmail() {
    this.mail.mailToAddress = this.newUser.email;
    this.checkMailSubscription = this.registrationService.checkEmail(this.mail).subscribe(
      emailCode => {
        this.emailCode = emailCode;
        console.log('YES');
        console.log(this.emailCode);
      }, () => {
        console.log('NO');
      }
    )
  }

  checkCode(event) {
    this.isCorrectCode = event.target.value == this.emailCode;
  }

  checkPass(event) {
    let passField: any = document.getElementById('userPass');
    this.isCorrectPass = event.target.value == passField.value;
  }

  checkLogin() {
    (this.authSubscription = this.authenticationService.authenticate(this.newUser.email, this.newUser.password).subscribe(
      () => {
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
        this.invalidLogin = false;
      }, () => {
        this.invalidLogin = true;
      }
    ));
  }

}
