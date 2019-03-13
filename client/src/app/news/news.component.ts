import { Component, OnInit } from '@angular/core';
import {PageTitleService} from "../services/page-title.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor( private pageTitle: PageTitleService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - News');
  }

}
