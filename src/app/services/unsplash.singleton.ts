import { Injectable } from '@angular/core';
import { UnsplashApiService } from './unsplash.api.service';


@Injectable()
export class UnsplashSingleton {

  public readonly users: any[] = [];
  public readonly userSelected: any = {};
  public readonly photos: any[] = [];

  constructor (
    private unsplashApiService: UnsplashApiService,
  ) { }

  private _usersAdd(users: any[]): void {
    users.map(user => {
      this.users.push(user);
    });
  }

  private _usersRefresh(): void {
    this.users.length = 0;
  }

  private _userSelect(user): void {
    Object.assign(this.userSelected, user);
  }

  private _photosAdd(photos: any[]): void {
    photos.map(photo => {
      this.photos.push(photo);
    });
  }

  private _photosReset(): void {
    this.photos.length = 0;
  }

  public usersSearch(query: string, queryPrevious: string) {
    this.unsplashApiService.apiUserSearch(query).subscribe((data: any) => {
      if (queryPrevious !== query) {
        this._usersRefresh();
      }
      this._usersAdd(data.results);
    });
  }

  public getUserPhoto(user: any) {
    if (this.userSelected.id === user.id) {
      return;
    }

    this._userSelect(user);
    this._photosReset();

    this.unsplashApiService.apiGetUserPhoto(user.username).subscribe((data: any) => {
      this._photosAdd(data);
    });
  }
}
