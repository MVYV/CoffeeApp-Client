import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { News } from '../../models/news.model';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { ClrDatagridSortOrder } from '@clr/angular';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  showForm: boolean = false;
  showArticle: boolean;
  showDeleteUserConfirmation: boolean = false;
  loading: boolean;
  isNewArticle: boolean;
  isSuccess: boolean = false;
  isError: boolean = false;
  users: User[];
  news: News[];
  selectedUser: User;
  selectedArticle: News;
  newArticle: News;
  dataBaseKey: string;
  numberOfUsers: number;
  ascSort: any;
  descSort: any;

  constructor( private pageTitle: PageTitleService,
               private registrationService: UserRegistrationService,
               private newsService: NewsService) { }

  ngOnInit() {
    this.ascSort = ClrDatagridSortOrder.ASC;
    this.descSort = ClrDatagridSortOrder.DESC;
    this.pageTitle.setTitle('Coffee Products - Admin Page');
    this.loading = true;
    this.selectedUser = new User();
    this.selectedArticle = new News();
    this.newArticle = new News();
    this.getAllUsers();
    this.getAllNews();
  }

  getAllUsers() {
    this.registrationService.getUsers().subscribe(
      users => {
        this.users = users;
        this.numberOfUsers = users.length;
        this.loading = false;
      });
  }

  editUser(user: User) {
    this.selectedUser = new User(
      user.id,
      user.userName,
      user.lastName,
      user.email,
      user.password,
      user.roles,
      user.isActive
    );
  }

  modifyUser() {
    this.registrationService.putUser(this.selectedUser).subscribe(
      () => {
        this.isSuccess = true;
        this.getAllUsers();
      }, () => {
        this.isError = true;
        this.getAllUsers();
      });
  }

  deleteOneUser() {
    this.registrationService.deleteUser(this.selectedUser).subscribe(
      () => {
        this.getAllUsers();
      }, () => {
        this.getAllUsers();
      });
  }

  banOneUser() {
    this.registrationService.banUser(this.selectedUser).subscribe(
      () => {
        this.getAllUsers();
      }, () => {
        this.getAllUsers();
      });
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  showDeleteDialog(db_key: string) {
    this.showDeleteUserConfirmation = true;
    this.dataBaseKey = db_key;
  }

  hideDeleteDialog() {
    this.showDeleteUserConfirmation = false;
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        this.news = news;
      });
  }

  editArticle(article: News) {
    this.isNewArticle = false;
    this.selectedArticle = new News(
      article.id,
      article.newsTitle,
      article.newsSubText,
      article.newsSource,
      article.newsDate,
      article.newsText
    );
  }

  createArticle() {
    this.selectedArticle = new News();
    this.showArticle = true;
    this.isNewArticle = true;
  }

  addNewArticle() {
    if (this.isNewArticle) {
      this.newsService.postArticle(this.selectedArticle).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllNews();
        },() => {
          this.isError = true;
          this.getAllNews();
        });
    } else {
      this.newsService.putArticle(this.selectedArticle).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllNews();
        }, () => {
          this.isError = true;
          this.getAllNews();
        });
    }
  }

  deleteOneArticle() {
    this.newsService.deleteArticle(this.selectedArticle).subscribe(
      () => {
        this.getAllNews();
      }, () => {
        this.getAllNews();
      });
  }

}
