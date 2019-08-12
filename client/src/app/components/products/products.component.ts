import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { NewsService } from "../../services/news-service";
import { News } from "../../models/news.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsLink: string;
  products: Product[];
  news: News[];

  constructor( private pageTitle: PageTitleService,
               private productsService: ProductsService,
               private newsService: NewsService) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Products');
    this.getAllProducts();
    this.getAllNews();
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
      }
    );
  }

  activeProduct(product: string) {
    this.productsLink = product;
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        this.news = news;
      });
  }

}
