import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { NewsService } from '../../services/news-service';
import { News } from '../../models/news.model';
import { GlobalVariablesService } from '../../services/global-variables.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  news: News[];
  postedNews: News[];
  loadingSpinner: boolean;

  getNewsSubscription: Subscription;

  constructor( private pageTitle: PageTitleService,
               private newsService: NewsService,
               private globalVariables: GlobalVariablesService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - News');
    this.getAllNews();
    this.loadingSpinner = true;
  }

  ngOnDestroy() {
    if (this.getNewsSubscription) {this.getNewsSubscription.unsubscribe();}
  }

  getAllNews() {
    this.getNewsSubscription = this.newsService.getNews().subscribe(
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
