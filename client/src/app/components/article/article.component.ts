import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { GlobalVariablesService } from '../../services/global-variables.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  selectedArticle: News;
  news: News[];
  products: Product[];
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;
  authenticateUser: User;
  selectedUser: User;
  userRoleArr: any;
  userRole: any;
  userComment: Comment;
  selectedComment: Comment;
  commentsForArticle: Comment[];
  isNewComment: boolean;

  getArticleSubscription: Subscription;
  getNewsSubscription: Subscription;
  getProductsSubscription: Subscription;
  getAuthSubscription: Subscription;
  getArticleCommentsSubscription: Subscription;
  postCommentsSubscription: Subscription;
  putCommentsSubscription: Subscription;
  deleteCommentSubscription: Subscription;
  banUserSubscription: Subscription;
  getOneUserSubscription: Subscription;

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private route: ActivatedRoute,
               private productsService: ProductsService,
               private registrationService: UserRegistrationService,
               public authenticationService: AuthenticationService,
               private commentsService: CommentsService,
               private globalVariables: GlobalVariablesService ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const selectedArticleId = +params['id'];
        this.getSelectedArticle(selectedArticleId);
        this.getAllCommentsForArticle(selectedArticleId);
      });
    this.authenticateUser = new User();
    this.selectedUser = new User();
    this.userComment = new Comment();
    this.selectedComment = new Comment();
    this.pageTitle.setTitle('Coffee Products - Article');
    this.getAllNews();
    this.getAllProducts();
    this.checkLoggedInUser();
  }

  ngOnDestroy() {
    if (this.getAuthSubscription) {this.getAuthSubscription.unsubscribe();}
    if (this.getProductsSubscription) {this.getProductsSubscription.unsubscribe();}
    if (this.getNewsSubscription) {this.getNewsSubscription.unsubscribe();}
    if (this.getArticleCommentsSubscription) {this.getArticleCommentsSubscription.unsubscribe();}
    if (this.postCommentsSubscription) {this.postCommentsSubscription.unsubscribe();}
    if (this.putCommentsSubscription) {this.putCommentsSubscription.unsubscribe();}
    if (this.deleteCommentSubscription) {this.deleteCommentSubscription.unsubscribe();}
    if (this.getAuthSubscription) {this.getAuthSubscription.unsubscribe();}
    if (this.banUserSubscription) {this.banUserSubscription.unsubscribe();}
    if (this.getOneUserSubscription) {this.getOneUserSubscription.unsubscribe();}
  }

  getSelectedArticle(articleId: number) {
    this.getArticleSubscription = this.newsService.getArticle(articleId).subscribe(
      (article: News) => {
        this.selectedArticle = article;
        window.scroll(0, 0);
      });
  }

  getAllNews() {
    this.getNewsSubscription = this.newsService.getNews().subscribe(
      news => {
        let localStorageLang = localStorage.getItem('translationLang');
        let currentLang = localStorageLang ? localStorageLang : this.globalVariables.siteLanguage;
        this.news = news.filter(articleLang => articleLang.language == currentLang);
      });
  }

  getAllProducts() {
    this.getProductsSubscription = this.productsService.getProducts().subscribe(
      products => {
        let localStorageLang = localStorage.getItem('translationLang');
        let currentLang = localStorageLang ? localStorageLang : this.globalVariables.siteLanguage;
        this.products = products.filter(productLang => productLang.language == currentLang);
      }
    );
  }

  loadUserData() {
    let userMail: any = sessionStorage.getItem('username');
    this.getAuthSubscription = this.registrationService.getAuthenticatedUser(userMail).subscribe(
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

  hideCommentForm() {
    let commentForm = document.getElementById('comment-form');
    commentForm.classList.add('comment-form-hidden');
    commentForm.classList.remove('comment-form-visible');
  }

  commentArticle() {
    this.userComment.newsId = this.selectedArticle.id;
    this.userComment.userId = this.authenticateUser.id;
    this.userComment.fullName = this.authenticateUser.userName + this.authenticateUser.lastName;
    if(this.isNewComment) {
      this.postCommentsSubscription = this.commentsService.postComment(this.userComment).subscribe(
        () => {
          console.log('Yes');
          this.hideCommentForm();
          this.route.params.subscribe(
            params => {
              const selectedArticleId = +params['id'];
              this.getAllCommentsForArticle(selectedArticleId);
            });
        }, () => {
          this.hideCommentForm();
          this.route.params.subscribe(
            params => {
              const selectedArticleId = +params['id'];
              this.getAllCommentsForArticle(selectedArticleId);
            });
        });
    } else {
      this.putCommentsSubscription = this.commentsService.putComment(this.userComment).subscribe(
        () => {
          console.log('Yes');
          this.route.params.subscribe(
            params => {
              const selectedArticleId = +params['id'];
              this.getAllCommentsForArticle(selectedArticleId);
            });
        }, () => {
          console.log('No');
          this.route.params.subscribe(
            params => {
              const selectedArticleId = +params['id'];
              this.getAllCommentsForArticle(selectedArticleId);
            });
        });
    }
  }

  getAllCommentsForArticle(articleID: number) {
    this.getArticleCommentsSubscription = this.commentsService.getNewsComments(articleID).subscribe(
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
    this.deleteCommentSubscription = this.commentsService.deleteComment(commentID).subscribe(
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

  banOneUser(userID: number) {
    this.getOneUserSubscription = this.registrationService.getOneUser(userID).subscribe(
      user => {
        this.selectedUser = user;
        this.banUserSubscription = this.registrationService.banUser(this.selectedUser).subscribe(
          () => {

          }, () => {

          });
      }, () => {

      });
  }
}
