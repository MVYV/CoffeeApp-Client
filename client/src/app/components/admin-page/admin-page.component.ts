import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { News } from '../../models/news.model';
import { Product } from "../../models/products.model";
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { ClrDatagridSortOrder } from '@clr/angular';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  showUser: boolean;
  showArticle: boolean;
  showProducts: boolean;
  showDeleteUserConfirmation: boolean = false;
  loading: boolean;
  isNewArticle: boolean;
  isNewUser: boolean;
  isNewProduct: boolean;
  isSuccess: boolean = false;
  isError: boolean = false;
  users: User[];
  newUser: User;
  selectedUser: User;
  news: News[];
  newArticle: News;
  selectedArticle: News;
  products: Product[];
  newProduct: Product;
  selectedProduct: Product;
  dataBaseKey: string;
  numberOfUsers: number;
  ascSort: any;
  descSort: any;

  constructor( private pageTitle: PageTitleService,
               private registrationService: UserRegistrationService,
               private newsService: NewsService,
               private productsService: ProductsService) { }

  ngOnInit() {
    this.ascSort = ClrDatagridSortOrder.ASC;
    this.descSort = ClrDatagridSortOrder.DESC;
    this.pageTitle.setTitle('Coffee Products - Admin Page');
    this.loading = true;
    this.selectedUser = new User();
    this.newUser = new User();
    this.selectedArticle = new News();
    this.newArticle = new News();
    this.selectedProduct = new Product();
    this.newProduct = new Product();
    this.getAllUsers();
    this.getAllNews();
    this.getAllProducts();
  }

  getAllUsers() {
    this.registrationService.getUsers().subscribe(
      users => {
        this.users = users;
        this.numberOfUsers = users.length;
        this.loading = false;
      });
  }

  addUser() {
    this.selectedUser = new User();
    this.showUser = true;
    this.isNewUser = true;
  }

  editUser(user: User) {
    this.isNewUser = false;
    this.selectedUser = new User(
      user.id,
      user.userName,
      user.lastName,
      user.email,
      user.password,
      user.roles,
      user.isActive,
      user.country,
      user.city,
      user.dateOfBirth,
      user.gender,
      user.avatar
    );
  }

  modifyUser() {
    if (this.isNewUser) {
      this.registrationService.postUser(this.selectedUser).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllUsers();
        },() => {
          this.isError = true;
          this.getAllUsers();
        });
    } else {
      this.registrationService.putUser(this.selectedUser).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllUsers();
        }, () => {
          this.isError = true;
          this.getAllUsers();
        });
    }

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
      article.newsModificationDate,
      article.newsText,
      article.newsImage
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

  getAllProducts() {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
      });
  }

  editProduct(product: Product) {
    this.isNewProduct = false;
    this.selectedProduct = new Product(
      product.id,
      product.productName,
      product.productType,
      product.image,
      product.description,
      product.price,
      product.productDate,
      product.productModificationDate
    );
  }

  createProduct() {
    this.selectedProduct = new Product();
    this.showProducts = true;
    this.isNewProduct = true;
  }

  addNewProduct() {
    if (this.isNewProduct) {
      this.productsService.postProduct(this.selectedProduct).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllProducts();
        }, () => {
          this.isError = true;
          this.getAllProducts();
        });
    } else {
      this.productsService.putProduct(this.selectedProduct).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllProducts();
        }, () => {
          this.isError = true;
          this.getAllProducts();
        });
    }
  }

  deleteOneProduct() {
    this.productsService.deleteProduct(this.selectedProduct).subscribe(
      () => {
        this.getAllProducts();
      }, () => {
        this.getAllProducts();
      });
  }

}
