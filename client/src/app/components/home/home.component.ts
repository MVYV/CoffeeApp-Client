import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { News } from '../../models/news.model';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { GlobalVariablesService } from '../../services/global-variables.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  news: News[];
  products: Product[];
  severalArticles: News[];
  severalProducts: Product[];

  getNewsSubscription: Subscription;
  getProductsSubscription: Subscription;

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private productsService: ProductsService,
               private globalVariables: GlobalVariablesService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Home');
    this.getAllNews();
    this.getAllProducts();
    window.addEventListener('scroll', this.homeScroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.homeScroll, true);
    if (this.getNewsSubscription) {this.getNewsSubscription.unsubscribe();}
    if (this.getProductsSubscription) {this.getProductsSubscription.unsubscribe();}
  }

  getAllNews() {
    this.getNewsSubscription = this.newsService.getNews().subscribe(
      news => {
        let localStorageLang = localStorage.getItem('translationLang');
        let currentLang = localStorageLang ? localStorageLang : this.globalVariables.siteLanguage;
        this.news = news.filter(articleLang => articleLang.language == currentLang);
        this.severalArticles = this.news.slice(0, 6);
      });
  }

  getAllProducts() {
    this.getProductsSubscription = this.productsService.getProducts().subscribe(
      products => {
        let localStorageLang = localStorage.getItem('translationLang');
        let currentLang = localStorageLang ? localStorageLang : this.globalVariables.siteLanguage;
        this.products = products.filter(productLang => productLang.language == currentLang);
        this.severalProducts = this.products.slice(0, 5);
      });
  }

  homeScroll = (): void => {
    let scrollContainer = document.getElementById('scroll-container');
    let homePageNews = document.getElementById('homePage-news');
    if (homePageNews.getBoundingClientRect().top <= 60) {
      scrollContainer.classList.remove('scroll-container-image1');
      scrollContainer.classList.add('scroll-container-image2');
    } else {
      scrollContainer.classList.remove('scroll-container-image2');
      scrollContainer.classList.add('scroll-container-image1');
    }
  }

}
