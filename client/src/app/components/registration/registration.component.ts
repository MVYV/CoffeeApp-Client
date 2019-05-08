import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UserRegistrationService]
})
export class RegistrationComponent implements OnInit {

  newUser: User;

  constructor(
    private pageTitle: PageTitleService,
    private registrationService: UserRegistrationService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Registration');
    this.newUser = new User('','','','');
  }

  addNewUser() {
    this.registrationService.postUser(this.newUser).subscribe(
      user => {
      console.log('Done!!!');
    },error => {
      console.log('Fail(((');
    });
  }

}
