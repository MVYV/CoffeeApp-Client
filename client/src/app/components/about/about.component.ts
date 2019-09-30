import { Component, OnInit } from '@angular/core';
import { PageTitleService } from "../../services/page-title.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  allCheckBoxes: any = document.querySelectorAll('input[type=checkbox]');

  constructor( private pageTitle: PageTitleService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - About Us');
  }

  saveCheckBoxesState() {
    let allCheckBoxes: any = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < allCheckBoxes.length; i++) {
      localStorage.setItem(allCheckBoxes[i].value, allCheckBoxes[i].checked);
    }
  }

  loadCheckBoxesState() {
    let allCheckBoxes: any = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < allCheckBoxes.length; i++) {
      allCheckBoxes[i].checked = localStorage.getItem(allCheckBoxes[i].value) === 'true' ? true:false;
    }
  }

}
