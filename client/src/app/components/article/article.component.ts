import { Component, OnInit } from '@angular/core';
import { PageTitleService } from "../../services/page-title.service";
import { NewsService } from '../../services/news-service';
import { ProductsService } from "../../services/products.service";
import { Product } from "../../models/products.model";
import { News } from '../../models/news.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  selectedArticle: News;
  news: News[];
  products: Product[];

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private route: ActivatedRoute,
               private productsService: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const selectedArticleId = +params['id'];
        this.getSelectedArticle(selectedArticleId);
      });
    this.pageTitle.setTitle('Coffee Products - Article');
    this.getAllNews();
    this.getAllProducts();
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
}
