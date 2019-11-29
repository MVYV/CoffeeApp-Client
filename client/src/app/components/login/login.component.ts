import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username = '';
  password = '';
  invalidLogin = false;

  authSubscription: Subscription;

  constructor( private pageTitle: PageTitleService,
               private router: Router,
               private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Login');
  }

  ngOnDestroy() {
    if (this.authSubscription) {this.authSubscription.unsubscribe();}
  }

  checkLogin() {
    (this.authSubscription = this.authenticationService.authenticate(this.username, this.password).subscribe(
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
