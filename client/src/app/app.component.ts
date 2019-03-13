import { Component } from '@angular/core';
import { TranslateService } from "./services/translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( private translate: TranslateService) {
      console.log(translate.data);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
