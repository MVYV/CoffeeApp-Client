import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { News } from '../../models/news.model';
import { ActivatedRoute } from '@angular/router';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { Comment } from '../../models/comment.model';
import { CommentsService } from '../../services/comments.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  selectedArticle: News;
  news: News[];
  products: Product[];
  p: number = 1;
  authenticateUser: User;
  userRoleArr: any;
  userRole: any;
  userComment: Comment;
  selectedComment: Comment;
  commentsForArticle: Comment[];
  isNewComment: boolean;

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private route: ActivatedRoute,
               private productsService: ProductsService,
               private registrationService: UserRegistrationService,
               public authenticationService: AuthenticationService,
               private commentsService: CommentsService ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const selectedArticleId = +params['id'];
        this.getSelectedArticle(selectedArticleId);
        this.getAllCommentsForArticle(selectedArticleId);
      });
    this.authenticateUser = new User();
    this.userComment = new Comment();
    this.selectedComment = new Comment();
    this.pageTitle.setTitle('Coffee Products - Article');
    this.getAllNews();
    this.getAllProducts();
    this.checkLoggedInUser();
  }

  getSelectedArticle(articleId: number) {
    this.newsService.getArticle(articleId).subscribe(
      (article: News) => {
        this.selectedArticle = article;
        window.scroll(0, 0);
      });
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        this.news = news;
      });
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
      }
    );
  }

  loadUserData() {
    let userMail: any = sessionStorage.getItem('username');
    this.registrationService.getAuthenticatedUser(userMail).subscribe(
      userData => {
        this.authenticateUser = userData;
        this.userRoleArr = this.authenticateUser.roles;
        this.userRole = this.userRoleArr[0].role;
      }, () => {

      });
  }

  checkLoggedInUser() {
    let loggedInUser: any = sessionStorage.getItem('username');
    if (loggedInUser) {
      this.loadUserData();
    } else {

    }
  }

  showCommentForm() {
    this.isNewComment = true;
    let commentForm = document.getElementById('comment-form');
    commentForm.classList.remove('comment-form-hidden');
    commentForm.classList.add('comment-form-visible');
  }

  commentArticle() {
    this.userComment.newsId = this.selectedArticle.id;
    this.userComment.userId = this.authenticateUser.id;
    this.userComment.fullName = this.authenticateUser.userName + this.authenticateUser.lastName;
    if(this.isNewComment) {
      this.commentsService.postComment(this.userComment).subscribe(
        () => {
          console.log('Yes');
        }, () => {
          console.log('No');
        });
    } else {
      this.commentsService.putComment(this.userComment).subscribe(
        () => {
          console.log('Yes');
        }, () => {
          console.log('No');
        });
    }
  }

  getAllCommentsForArticle(articleID: number) {
    this.commentsService.getNewsComments(articleID).subscribe(
      allComments => {
        this.commentsForArticle = allComments;
      }, () => {

      });
  }

  editComment(comment: Comment) {
    this.isNewComment = false;
    let commentForm = document.getElementById('comment-form');
    commentForm.classList.remove('comment-form-hidden');
    commentForm.classList.add('comment-form-visible');
    this.userComment = new Comment(
      comment.id,
      comment.commentText,
      comment.productId,
      comment.newsId,
      comment.userId,
      comment.fullName
    );
  }

  removeComment(commentID: number) {
    this.commentsService.deleteComment(commentID).subscribe(
      () => {
        console.log('YES');
      }, () => {
        console.log('NO');
      });
  }

  showDeleteConfirmation(comment_ID) {
    let deleteTooltip = document.getElementById(comment_ID);
    deleteTooltip.classList.add('delete-confirmation-visible');
    deleteTooltip.classList.remove('delete-confirmation-hidden');
  }

  hideDeleteConfirmation(comment_ID) {
    let deleteTooltip = document.getElementById(comment_ID);
    deleteTooltip.classList.add('delete-confirmation-hidden');
    deleteTooltip.classList.remove('delete-confirmation-visible');
  }
}
