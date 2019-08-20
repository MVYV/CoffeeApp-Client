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
  postedNews: News[];
  loadingSpinner: boolean;

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - News');
    this.getAllNews();
    this.loadingSpinner = true;
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        this.news = news;
        this.postedNews = news.slice(0, 7);
        this.loadingSpinner = false;
      });
  }

  onScrollDown() {
    if(this.postedNews.length < this.news.length) {
      let p = this.postedNews.length;
      let n = this.news.length;
      for(let i = p; i <= p + 2; i++) {
        if(i <= n - 1) {
          this.postedNews.push(this.news[i]);
        }
      }
    }
  }

}
