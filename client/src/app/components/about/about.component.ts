import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutArr: any[] = [];

  constructor( private pageTitle: PageTitleService,
               private aboutService: AboutService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - About Us');
    this.getContactInformation();
  }

  getContactInformation() {
    this.aboutService.getContactInfo().subscribe(
      aboutInfo => {
        this.aboutArr.push(aboutInfo);
      }, () => {

      });
  }
}
