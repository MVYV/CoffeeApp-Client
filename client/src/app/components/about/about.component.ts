import { Component, OnInit } from '@angular/core';
import {PageTitleService} from "../../services/page-title.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor( private pageTitle: PageTitleService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - About Us');
  }

}
