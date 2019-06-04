import { Component, OnInit } from '@angular/core';
import { PageTitleService } from "../../services/page-title.service";
import { NewsService } from '../../services/news-service';
import { News } from '../../models/news.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  selectedArticle: News;
  selectedArticleId: any;

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedArticleId = this.route.snapshot.paramMap.get('id');
    this.pageTitle.setTitle('Coffee Products - Article');
    this.getSelectedArticle();
  }

  getSelectedArticle() {
    this.newsService.getArticle(this.selectedArticleId).subscribe(
      (article: News) => {
        this.selectedArticle = article;
      });
  }
}
