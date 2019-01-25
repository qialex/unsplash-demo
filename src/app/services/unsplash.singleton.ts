import { Injectable } from '@angular/core';
import { UnsplashApiService } from './unsplash.api.service';
import { Subject } from 'rxjs';


@Injectable()
export class UnsplashSingleton {

  private readonly PER_PAGE_PHOTOS: number = 15;

  public readonly userSelected: any = {};
  public readonly photos: any[] = [];
  public readonly photosObservable: Subject<any> = new Subject<any>();
  private _photosAllLoaded: boolean;

  public loading: boolean;

  constructor (
    private unsplashApiService: UnsplashApiService,
  ) { }

  private _userSelect(user): void {
    Object.assign(this.userSelected, user);
  }

  private _photosAddOrNothing(photos: any[]): void {
    if (!photos.length) {
      this._photosAllLoaded = true;
    } else {
      this.photos.push(...photos);
    }
    this.photosObservable.next(this.photos);
  }

  private _photosReset(): void {
    this.photos.length = 0;
  }

  public photosGetByUser(user: any) {
    if (this.userSelected.id === user.id) {
      return;
    }

    this._userSelect(user);
    this._photosReset();

    this.loading = true;
    this.unsplashApiService.apiGetUserPhoto(user.username, this.PER_PAGE_PHOTOS, 1).subscribe((photos: any) => {
      this._photosAddOrNothing(photos);
      this.loading = false;
    });
  }

  public photosGetMore() {
    if (this.loading) {
      return;
    }
    const page: number = ( ( this.photos.length / this.PER_PAGE_PHOTOS ) << 0 ) + 1;
    this.loading = true;
    this.unsplashApiService.apiGetUserPhoto(this.userSelected.username, this.PER_PAGE_PHOTOS, page).subscribe((photos: any) => {
      this._photosAddOrNothing(photos);
      this.loading = false;
    });
  }
}
