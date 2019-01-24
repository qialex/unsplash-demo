import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';


@Injectable()
export class UnsplashApiService {

  constructor (
    private httpClient: HttpClient,
  ) { }

  apiUserSearch(query: string) {
    return this.httpClient.get(environment.unsplash.apiUrl + `search/users?query=${encodeURIComponent(query)}`);
  }

  apiGetUserPhoto(username: string) {
    return this.httpClient.get(environment.unsplash.apiUrl + `users/${encodeURIComponent(username)}/photos`);
  }
}
