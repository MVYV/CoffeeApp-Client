import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { News } from '../../models/news.model';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { GlobalVariablesService } from '../../services/global-variables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news: News[];
  products: Product[];
  severalArticles: News[];
  severalProducts: Product[];

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private productsService: ProductsService,
               private globalVariables: GlobalVariablesService) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Home');
    this.getAllNews();
    this.getAllProducts();
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        let localStorageLang = localStorage.getItem('translationLang');
        let currentLang = localStorageLang ? localStorageLang : this.globalVariables.siteLanguage;
        this.news = news.filter(articleLang => articleLang.language == currentLang);
        this.severalArticles = this.news.slice(0, 6);
      });
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe(
      products => {
        let localStorageLang = localStorage.getItem('translationLang');
        let currentLang = localStorageLang ? localStorageLang : this.globalVariables.siteLanguage;
        this.products = products.filter(productLang => productLang.language == currentLang);
        this.severalProducts = this.products.slice(0, 4);
      });
  }

  hideUpperFunc() {
    let upperBox = document.getElementById('upperHiddenBox');
    upperBox.classList.remove('hiddenBoxShow');
  }

  hideLowerFunc() {
    let lowerBox = document.getElementById('lowerHiddenBox');
    lowerBox.classList.remove('hiddenBoxShow');
  }

  showUpperHiddenBox() {
    let upperBox = document.getElementById('upperHiddenBox');
    upperBox.classList.remove('hiddenBoxHide');
    upperBox.classList.add('hiddenBoxShow');
  }

  hideUpperHiddenBox() {
    setTimeout(this.hideUpperFunc, 1050);
  }

  showLowerHiddenBox() {
    let lowerBox = document.getElementById('lowerHiddenBox');
    lowerBox.classList.add('hiddenBoxShow');
  }

  hideLowerHiddenBox() {
    setTimeout(this.hideLowerFunc, 1000);
  }



}
