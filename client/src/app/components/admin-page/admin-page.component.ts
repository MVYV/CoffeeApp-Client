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

  showForm: boolean = false;
  showDeleteUserConfirmation: boolean = false;
  loading: boolean;
  isSuccess: boolean = false;
  isError: boolean = false;
  users: User[];
  selectedUser: User;
  numberOfUsers: number;

  constructor( private registrationService: UserRegistrationService ) { }

  ngOnInit() {
    this.loading = true;
    this.selectedUser = new User();
    this.getAllUsers();
  }

  getAllUsers() {
    this.registrationService.getUsers().subscribe(
      users => {
        // users.roles.forEach(r => console.log("role: " + r.role));
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
      user.roles,
      user.active
    );
  }

  modifyUser() {
    this.registrationService.putUser(this.selectedUser).subscribe(
      () => {
        console.log('Updated');
        this.isSuccess = true;
        this.getAllUsers();
      }, () => {
        console.log('NOOOOOOOOO!!!');
        this.isError = true;
        this.getAllUsers();
      });
  }

  deleteOneUser() {
    this.registrationService.deleteUser(this.selectedUser).subscribe(
      () => {
        console.log('YES');
        this.getAllUsers();
      }, () => {
        console.log('NO');
        this.getAllUsers();
      });
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  showDeleteDialog() {
    this.showDeleteUserConfirmation = true;
  }

  hideDeleteDialog() {
    this.showDeleteUserConfirmation = false;
  }

}
