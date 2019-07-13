import { Component, OnInit } from '@angular/core';
import { PageTitleService } from "../../services/page-title.service";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = 'kiesha';
  password = '';
  invalidLogin = false;

  constructor( private pageTitle: PageTitleService,
               private router: Router,
               private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Login');
  }

  checkLogin() {
    (this.authenticationService.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['']);
        this.invalidLogin = false;
      }, error => {
        this.invalidLogin = true;
      }
    ));
  }

}
