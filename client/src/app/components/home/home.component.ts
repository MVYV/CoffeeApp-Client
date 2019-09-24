import { Component, OnInit } from '@angular/core';
import { PageTitleService } from "../../services/page-title.service";
import { NewsService } from '../../services/news-service';
import { News } from '../../models/news.model';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news: News[];
  products: Product[];
  oneArticle: News[];
  oneProduct: Product[];

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private productsService: ProductsService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Home');
    this.getAllNews();
    this.getAllProducts();
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        this.news = news;
        this.oneArticle = news.slice(0, 3);
      });
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
        this.oneProduct = products.slice(0, 1);
      });
  }

}
