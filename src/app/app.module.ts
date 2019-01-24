import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UnsplashInterceptor, UnsplashApiService, UnsplashSingleton} from './services';
import { AppComponent, PhotoGridComponent, SearchComponent, UserListComponent } from './components';


@NgModule({
  declarations: [
    AppComponent,
    PhotoGridComponent,
    SearchComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
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
