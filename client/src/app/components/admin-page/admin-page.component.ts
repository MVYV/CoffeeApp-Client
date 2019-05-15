import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { Role } from '../../models/roles.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  loading: boolean;
  users: User[];
  selectedUser: User;
  numberOfUsers: number;
  role: Role;

  constructor( private registrationService: UserRegistrationService ) { }

  ngOnInit() {
    this.loading = true;
    this.selectedUser = new User();
    this.getAllUsers();
  }

  getAllUsers() {
    this.registrationService.getUsers().subscribe(
      users => {
        this.users = users;
        this.numberOfUsers = users.length;
        this.loading = false;
        console.log('Done!!!');
      });
  }

  editUser(user: User) {
    this.selectedUser = new User(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      user.role,
      user.active
    );
  }

  modifyUser() {
    this.registrationService.putUser(this.selectedUser).subscribe(
      () => {
        console.log('Updated');
      }, () => {
        console.log('NOOOOOOOOO!!!');
      });
  }

  deleteOneUser(user_id: number) {
    this.registrationService.deleteUser(user_id).subscribe(
      () => {
        console.log('YES');
      }, () => {
        console.log('NO');
      });
  }

}
