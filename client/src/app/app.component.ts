import { Component, OnInit } from '@angular/core';
import { TranslateService } from "./services/translate.service";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  navLinkTitle: string;

  constructor( private translate: TranslateService,
               private authenticationService: AuthenticationService) {}

  ngOnInit() {
    // this.activeNavLink('home');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  activeNavLink(linkTitle: string) {
    this.navLinkTitle = linkTitle;
  }
}
