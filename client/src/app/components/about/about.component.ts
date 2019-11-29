import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { AboutService } from '../../services/about.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  aboutArr: any[] = [];
  aboutSubscription: Subscription;

  constructor( private pageTitle: PageTitleService,
               private aboutService: AboutService ) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - About Us');
    this.getContactInformation();
  }

  ngOnDestroy() {
    if (this.aboutSubscription) {this.aboutSubscription.unsubscribe();}
  }

  getContactInformation() {
    this.aboutSubscription = this.aboutService.getContactInfo().subscribe(
      aboutInfo => {
        this.aboutArr.push(aboutInfo);
      }, () => {

      });
  }
}
