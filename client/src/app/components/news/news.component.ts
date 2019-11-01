import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { News } from '../../models/news.model';
import { GlobalVariablesService } from '../../services/global-variables.service';

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
               private newsService: NewsService,
               private globalVariables: GlobalVariablesService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - News');
    this.getAllNews();
    this.loadingSpinner = true;
  }

  getAllNews() {
    this.newsService.getNews().subscribe(
      news => {
        let localStorageLang = localStorage.getItem('translationLang');
        let currentLang = localStorageLang ? localStorageLang : this.globalVariables.siteLanguage;
        this.news = news.filter(articleLang => articleLang.language == currentLang);
        this.postedNews = this.news.slice(0, 5);
        this.loadingSpinner = false;
      });
  }

  onScrollDown() {
    if(this.postedNews.length < this.news.length) {
      let p = this.postedNews.length;
      let n = this.news.length;
      for(let i = p; i <= p + 2; i++) {
        if(i <= n - 1) {
          setTimeout(() => this.postedNews.push(this.news[i]), 300);
        }
      }
    }
  }

}
