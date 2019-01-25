import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';


@Injectable()
export class UnsplashApiService {

  constructor (
    private httpClient: HttpClient,
  ) { }

  apiUserSearch(query: string, perPage: number, page: number) {

    const options = {params: {
      query: encodeURIComponent(query),
      per_page: perPage.toString(),
      page: page.toString()
    }};

    return this.httpClient.get(environment.unsplash.apiUrl + `search/users`, options);
  }

  apiGetUserPhoto(username: string, perPage: number, page: number) {

    const options = {params: {per_page: perPage.toString(), page: page.toString()}};

    return this.httpClient.get(environment.unsplash.apiUrl + `users/${encodeURIComponent(username)}/photos`, options);
  }
}
