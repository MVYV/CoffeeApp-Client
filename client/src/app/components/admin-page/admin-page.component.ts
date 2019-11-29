import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRegistrationService } from '../../services/user-registration.service';
import { User } from '../../models/users.model';
import { News } from '../../models/news.model';
import { Mail } from '../../models/mail.model';
import { Product } from '../../models/products.model';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { ClrDatagridSortOrder } from '@clr/angular';
import { ProductsService } from '../../services/products.service';
import { Role } from '../../models/roles.model';
import { About } from '../../models/about.model';
import { AboutService } from '../../services/about.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  showUser: boolean;
  showArticle: boolean;
  showProducts: boolean;
  showInfo: boolean;
  showDeleteUserConfirmation: boolean = false;
  showMailWindow: boolean = false;
  loading: boolean;
  isNewArticle: boolean;
  isNewUser: boolean;
  isNewProduct: boolean;
  isSuccess: boolean = false;
  isError: boolean = false;
  users: User[];
  newUser: User;
  selectedUser: User;
  roles: Role[];
  selectedRoles: Role;
  mail: Mail;
  news: News[];
  newArticle: News;
  selectedArticle: News;
  numberOfNews: number;
  products: Product[];
  newProduct: Product;
  selectedProduct: Product;
  numberOfProducts: number;
  dataBaseKey: string;
  ascSort: any;
  descSort: any;
  userRoles: Role[];
  aboutArr: any[] = [];
  selectedInfo: About;

  private getUserSubscription: Subscription;
  private putUserSubscription: Subscription;
  private postUserSubscription: Subscription;
  private banUserSubscription: Subscription;
  private deleteUserSubscription: Subscription;
  private getNewsSubscription: Subscription;
  private postNewsSubscription: Subscription;
  private putNewsSubscription: Subscription;
  private deleteNewsSubscription: Subscription;
  private getProductsSubscription: Subscription;
  private postProductsSubscription: Subscription;
  private putProductsSubscription: Subscription;
  private deleteProductsSubscription: Subscription;
  private getAboutSubscription: Subscription;
  private putAboutSubscription: Subscription;
  private getRolesSubscription: Subscription;
  private mailSubscription: Subscription;

  quillEditorStyle = {
    height: '300px'
  };

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['clean'],
    ]
  };

  constructor( private pageTitle: PageTitleService,
               private registrationService: UserRegistrationService,
               private newsService: NewsService,
               private productsService: ProductsService,
               private aboutService: AboutService ) { }

  ngOnInit() {
    this.ascSort = ClrDatagridSortOrder.ASC;
    this.descSort = ClrDatagridSortOrder.DESC;
    this.pageTitle.setTitle('Coffee Products - Admin Page');
    this.loading = true;
    this.selectedUser = new User();
    this.newUser = new User();
    this.mail = new Mail();
    this.selectedArticle = new News();
    this.newArticle = new News();
    this.selectedProduct = new Product();
    this.newProduct = new Product();
    this.selectedInfo = new About();
    this.getAllUsers();
    this.getUserRoles();
    this.getAllNews();
    this.getAllProducts();
    this.getContactInformation();
  }

  ngOnDestroy() {
    if (this.getUserSubscription) {this.getUserSubscription.unsubscribe();}
    if (this.putUserSubscription) {this.putUserSubscription.unsubscribe();}
    if (this.postUserSubscription) {this.postUserSubscription.unsubscribe();}
    if (this.banUserSubscription) {this.banUserSubscription.unsubscribe();}
    if (this.deleteUserSubscription) {this.deleteUserSubscription.unsubscribe();}
    if (this.getNewsSubscription) {this.getNewsSubscription.unsubscribe();}
    if (this.postNewsSubscription) {this.postNewsSubscription.unsubscribe();}
    if (this.putNewsSubscription) {this.putNewsSubscription.unsubscribe();}
    if (this.deleteNewsSubscription) {this.deleteNewsSubscription.unsubscribe();}
    if (this.getProductsSubscription) {this.getProductsSubscription.unsubscribe();}
    if (this.postProductsSubscription) {this.postProductsSubscription.unsubscribe();}
    if (this.putProductsSubscription) {this.putProductsSubscription.unsubscribe();}
    if (this.deleteProductsSubscription) {this.deleteProductsSubscription.unsubscribe();}
    if (this.getAboutSubscription) {this.getAboutSubscription.unsubscribe();}
    if (this.putAboutSubscription) {this.putAboutSubscription.unsubscribe();}
    if (this.getRolesSubscription) {this.getRolesSubscription.unsubscribe();}
    if (this.mailSubscription) {this.mailSubscription.unsubscribe();}
  }

  sendMailToUser() {
    this.mailSubscription = this.registrationService.mailToUser(this.mail).subscribe(
      () => {
        console.log('Yes');
      }, () => {
        console.log('No');
      });
  }

  getContactInformation() {
    this.getAboutSubscription = this.aboutService.getContactInfo().subscribe(
      aboutInfo => {
        this.aboutArr.push(aboutInfo);
      }, () => {

      });
  }

  editInfo(information: About) {
    this.selectedInfo = new About(
      information.id,
      information.contactInfo
    );
  }

  modifyInfo() {
    this.putAboutSubscription = this.aboutService.putContactInfo(this.selectedInfo).subscribe(
      () => {
        this.isSuccess = true;
        this.aboutArr = [];
        this.getContactInformation();
      }, () => {
        this.isError = true;
        this.aboutArr = [];
        this.getContactInformation();
      });
  }

  getAllUsers() {
    this.getUserSubscription = this.registrationService.getUsers().subscribe(
      users => {
        this.users = users;
        this.loading = false;
      }, () => {

      });
  }

  getUserRoles() {
    this.getRolesSubscription = this.registrationService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      }, () => {
      });
  }

  addUser() {
    this.selectedUser = new User();
    this.showUser = true;
    this.isNewUser = true;
  }

  editUser(user: User) {
    this.isNewUser = false;
    this.mail.mailTo = user.id;
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
      this.selectedUser.roles = this.roles.filter(r => r.role == this.selectedRoles);
      this.postUserSubscription = this.registrationService.postUser(this.selectedUser).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllUsers();
        },() => {
          this.isError = true;
          this.getAllUsers();
        });
    } else {
      this.selectedUser.roles = this.roles.filter(r => r.role == this.selectedRoles);
      this.putUserSubscription = this.registrationService.putUser(this.selectedUser).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllUsers();
          console.log(this.selectedUser.roles);
        }, () => {
          this.isError = true;
          this.getAllUsers();
          console.log(this.selectedUser.roles);
        });
    }

  }

  deleteOneUser() {
    this.deleteUserSubscription = this.registrationService.deleteUser(this.selectedUser).subscribe(
      () => {
        this.getAllUsers();
      }, () => {
        this.getAllUsers();
      });
  }

  banOneUser() {
    this.banUserSubscription = this.registrationService.banUser(this.selectedUser).subscribe(
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
    this.getNewsSubscription = this.newsService.getNews().subscribe(
      news => {
        this.news = news;
        this.numberOfNews = news.length;
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
      article.newsImage,
      article.language
    );
  }

  createArticle() {
    this.selectedArticle = new News();
    this.showArticle = true;
    this.isNewArticle = true;
  }

  addNewArticle() {
    if (this.isNewArticle) {
      this.postNewsSubscription = this.newsService.postArticle(this.selectedArticle).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllNews();
        },() => {
          this.isError = true;
          this.getAllNews();
        });
    } else {
      this.putNewsSubscription = this.newsService.putArticle(this.selectedArticle).subscribe(
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
    this.deleteNewsSubscription = this.newsService.deleteArticle(this.selectedArticle).subscribe(
      () => {
        this.getAllNews();
      }, () => {
        this.getAllNews();
      });
  }

  getAllProducts() {
    this.getProductsSubscription = this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
        this.numberOfProducts = products.length;
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
      product.productModificationDate,
      product.language
    );
  }

  createProduct() {
    this.selectedProduct = new Product();
    this.showProducts = true;
    this.isNewProduct = true;
  }

  addNewProduct() {
    if (this.isNewProduct) {
      this.postProductsSubscription = this.productsService.postProduct(this.selectedProduct).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllProducts();
        }, () => {
          this.isError = true;
          this.getAllProducts();
        });
    } else {
      this.putProductsSubscription = this.productsService.putProduct(this.selectedProduct).subscribe(
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
    this.deleteProductsSubscription = this.productsService.deleteProduct(this.selectedProduct).subscribe(
      () => {
        this.getAllProducts();
      }, () => {
        this.getAllProducts();
      });
  }

}
