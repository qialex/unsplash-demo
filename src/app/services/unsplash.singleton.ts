import { Injectable } from '@angular/core';
import { UnsplashApiService } from './unsplash.api.service';
import { Subject } from 'rxjs';
import { UserInterface, PhotoInterface } from '../model';


@Injectable()
export class UnsplashSingleton {

  private readonly PER_PAGE_PHOTOS: number = 25;

  public readonly userSelected: UserInterface = {} as UserInterface;
  public readonly photos: PhotoInterface[] = [];
  public readonly photosObservable: Subject<PhotoInterface[]> = new Subject<PhotoInterface[]>();
  private _photosAllLoaded: boolean;

  public loading: boolean;

  constructor (
    private unsplashApiService: UnsplashApiService,
  ) { }

  private _userSelect(user: UserInterface): void {
    Object.assign(this.userSelected, user);
  }

  private _photosAddOrNothing(photos: PhotoInterface[]): void {
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

  public photosGetByUser(user: UserInterface): void {
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

  public photosGetMore(): void {
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
