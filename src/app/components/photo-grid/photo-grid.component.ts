import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { UnsplashSingleton } from '../../services';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.html',
  styleUrls: ['./photo-grid.scss']
})
export class PhotoGridComponent {

  @ViewChild(PerfectScrollbarDirective) public readonly ps: PerfectScrollbarDirective;

  public photos: any[];

  constructor(
    private unsplashSingleton: UnsplashSingleton,
    private ref: ChangeDetectorRef
  ) {
    this.unsplashSingleton.photosObservable.subscribe((photos: any[]) => {
      this.photos = photos;
      this.ref.detectChanges();
    });
  }

  handlePsYReachEnd() {

    const geometry = this.ps.geometry();

    if (geometry.y) {

      this.unsplashSingleton.photosGetMore();
    }
  }
}
