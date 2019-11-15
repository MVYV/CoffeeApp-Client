import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

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

  quillEditorStyle = {
    height: '300px'
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

  sendMailToUser() {
    this.registrationService.mailToUser(this.mail).subscribe(
      () => {
        console.log('Yes');
      }, () => {
        console.log('No');
      });
  }

  getContactInformation() {
    this.aboutService.getContactInfo().subscribe(
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
    this.aboutService.putContactInfo(this.selectedInfo).subscribe(
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
    this.registrationService.getUsers().subscribe(
      users => {
        this.users = users;
        this.loading = false;
      }, () => {

      });
  }

  getUserRoles() {
    this.registrationService.getRoles().subscribe(
      roles => {
        this.roles = roles;
        console.log(this.roles);
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
      // this.selectedUser.roles = this.userRoles;
      let dateArr = this.selectedUser.dateOfBirth.split('/').reverse();
      let newDateArr = [];
      newDateArr.push(dateArr[0], dateArr[2], dateArr[1]);
      let newDateString = newDateArr.join('-');
      this.selectedUser.dateOfBirth = new Date(Date.parse(newDateString));
      this.registrationService.postUser(this.selectedUser).subscribe(
        () => {
          this.isSuccess = true;
          this.getAllUsers();
        },() => {
          this.isError = true;
          this.getAllUsers();
        });
    } else {
      this.selectedUser.roles = this.roles.filter(r => r.role == this.selectedRoles);
      let dateArr = this.selectedUser.dateOfBirth.split('/').reverse();
      let newDateArr = [];
      newDateArr.push(dateArr[0], dateArr[2], dateArr[1]);
      let newDateString = newDateArr.join('-');
      this.selectedUser.dateOfBirth = new Date(Date.parse(newDateString));
      this.registrationService.putUser(this.selectedUser).subscribe(
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
