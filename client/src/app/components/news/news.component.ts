import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: News[];

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - News');
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        this.news = news;
      });
  }

}
