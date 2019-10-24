import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { News } from '../models/news.model';
import { Product } from '../models/products.model';
import { User } from '../models/users.model';

@Injectable()
export class CommentsService {

  constructor( private http: HttpClient ) { }

  public getNewsComments(articleIdNumber: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://march11app.herokuapp.com/comment/news/${articleIdNumber}`);
  }

  public getProductsComments(productIdNumber: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://march11app.herokuapp.com/comment/product/${productIdNumber}`);
  }

  public getAllCommentsByUser(user: User): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://march11app.herokuapp.com/comment/user/${user.id}`);
  }

  public postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('https://march11app.herokuapp.com/comment/', comment);
  }

  public putComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`https://march11app.herokuapp.com/comment/${comment.id}`, comment);
  }

  public deleteComment(commentIdNumber: number): Observable<Comment> {
    return this.http.delete<Comment>(`https://march11app.herokuapp.com/comment/${commentIdNumber}`);
  }
}
