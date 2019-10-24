import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { About } from '../models/about.model';

@Injectable()
export class AboutService {

  constructor( private http: HttpClient ) { }

  public getContactInfo(): Observable<About> {
    return this.http.get<About>('https://march11app.herokuapp.com/info');
  }

  public putContactInfo(about: About): Observable<About> {
    return this.http.put<About>(`https://march11app.herokuapp.com/info`, about);
  }
}
