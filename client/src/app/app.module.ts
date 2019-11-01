import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { ColorPickerModule } from "ngx-color-picker";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { NewsComponent } from './components/news/news.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ClarityModule } from '@clr/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserRegistrationService } from './services/user-registration.service';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NewsService } from './services/news-service';
import { ProductsService } from './services/products.service';
import { StyleService } from "./services/style.service";
import { FooterComponent } from './components/footer/footer.component';
import { AuthenticationService } from './services/authentication.service';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthenticationHttpInterceptorService } from './services/authentication-http-interceptor.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AngularPaginatorModule } from "angular-paginator";
import { NgxPaginationModule } from "ngx-pagination";
import { ProfileComponent } from './components/profile/profile.component';
import { AboutService } from './services/about.service';
import { CommentsService } from './services/comments.service';
import { GlobalVariablesService } from './services/global-variables.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    TranslatePipe,
    PageNotFoundComponent,
    ArticleComponent,
    LoginComponent,
    RegistrationComponent,
    AdminPageComponent,
    FooterComponent,
    LogoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    QuillModule,
    ColorPickerModule,
    PerfectScrollbarModule,
    InfiniteScrollModule,
    AngularPaginatorModule,
    NgxPaginationModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    Title,
    UserRegistrationService,
    NewsService,
    ProductsService,
    TranslateService,
    StyleService,
    AboutService,
    CommentsService,
    GlobalVariablesService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthenticationHttpInterceptorService, multi: true
    },
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
