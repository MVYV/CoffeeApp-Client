import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable()
export class NewsService {

  constructor( private http: HttpClient) { }

  public postArticle(article: News): Observable<News> {
    return this.http.post<News>('https://march11app.herokuapp.com/news', article);
  }

  public getNews(): Observable<News[]> {
    return this.http.get<News[]>('https://march11app.herokuapp.com/news');
  }

  public putArticle(article: News): Observable<News> {
    return this.http.put<News>(`https://march11app.herokuapp.com/news/${article.id}`, article);
  }

  public deleteArticle(article: News): Observable<News> {
    return this.http.delete<News>(`https://march11app.herokuapp.com/news/${article.id}`);
  }
}
