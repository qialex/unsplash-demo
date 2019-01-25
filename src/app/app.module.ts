import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';


import { UnsplashInterceptor, UnsplashApiService, UnsplashSingleton } from './services';
import { AppComponent, FooterComponent, PhotoGridComponent, PhotoSingleComponent, SearchComponent, UserListComponent } from './components';
import { AppRoutingModule } from './app-routing.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PhotoGridComponent,
    PhotoSingleComponent,
    SearchComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    PerfectScrollbarModule,
    NgProgressModule,
    NgProgressHttpModule,
    AppRoutingModule,
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
