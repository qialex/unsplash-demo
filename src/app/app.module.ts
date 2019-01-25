import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { UnsplashInterceptor, UnsplashApiService, UnsplashSingleton } from './services';
import { AppComponent, FooterComponent, PhotoGridComponent, SearchComponent, UserListComponent } from './components';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PhotoGridComponent,
    SearchComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnsplashInterceptor,
      multi: true,
    },
    UnsplashApiService,
    UnsplashSingleton,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
