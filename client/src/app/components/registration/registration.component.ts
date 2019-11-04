import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { Mail } from "../../models/mail.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UserRegistrationService]
})
export class RegistrationComponent implements OnInit {

  newUser: User;
  repeatPassword: any;
  eCode: any;
  isCorrectCode: boolean = false;
  isCorrectPass: boolean = false;
  emailCode: any;
  mail: Mail;

  constructor(
    private pageTitle: PageTitleService,
    private registrationService: UserRegistrationService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Registration');
    this.newUser = new User();
    this.mail = new Mail();
  }

  addNewUser() {
    let dateArr = this.newUser.dateOfBirth.split('/').reverse();
    let newDateArr = [];
    newDateArr.push(dateArr[0], dateArr[2], dateArr[1]);
    let newDateString = newDateArr.join('-');
    this.newUser.dateOfBirth = new Date(Date.parse(newDateString));
    this.registrationService.postUser(this.newUser).subscribe(
      () => {
      console.log('Done!!!');
    },() => {
      console.log('Fail(((');
    });
  }

  checkUserEmail() {
    this.mail.mailToAddress = this.newUser.email;
    this.registrationService.checkEmail(this.mail).subscribe(
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
    console.log(event.target.value);
    console.log(this.emailCode);
    console.log(this.isCorrectCode);
  }

  checkPass(event) {
    let passField: any = document.getElementById('userPass');
    this.isCorrectPass = event.target.value == passField.value;
  }

}
