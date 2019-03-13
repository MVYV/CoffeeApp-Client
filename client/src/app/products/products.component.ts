import { Component, OnInit } from '@angular/core';
import {PageTitleService} from "../services/page-title.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( private pageTitle: PageTitleService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Products');
  }

}
