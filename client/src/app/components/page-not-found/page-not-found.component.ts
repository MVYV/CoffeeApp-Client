import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor( private pageTitle: PageTitleService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Not Found');
  }

}
