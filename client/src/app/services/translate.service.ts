import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TranslateService {

  data: any = {};
  constructor( private _http: HttpClient ) { }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      // const langPath = `assets/locale/${lang || 'en'}.json`;
      const langPath = `assets/locale/${localStorage.getItem('translationLang') || 'en'}.json`;

      this._http.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        () => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
