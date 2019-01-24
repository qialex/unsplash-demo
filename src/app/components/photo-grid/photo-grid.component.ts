import { Component } from '@angular/core';
import { UnsplashApiService, UnsplashSingleton } from '../../services';


@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.html',
  styleUrls: ['./photo-grid.scss']
})
export class PhotoGridComponent {

  public readonly photos: any[] = this.unsplashSingleton.photos;

  constructor(
    private unsplashApiService: UnsplashApiService,
    private unsplashSingleton: UnsplashSingleton,
  ) { }
}
