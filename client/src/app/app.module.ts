import {BrowserModule, Title} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ClarityModule } from "@clr/angular";
import { HttpClientModule } from "@angular/common/http";
import { TranslateService } from "./services/translate.service";
import { TranslatePipe } from './pipes/translate.pipe';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NewsComponent,
    ProductsComponent,
    HomeComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule
  ],
  providers: [
    Title,
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
