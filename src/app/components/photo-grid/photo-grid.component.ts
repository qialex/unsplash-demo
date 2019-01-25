import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {UnsplashApiService, UnsplashSingleton} from '../../services';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.html',
  styleUrls: ['./photo-grid.scss']
})
export class PhotoGridComponent {

  @ViewChild(PerfectScrollbarDirective) public readonly ps: PerfectScrollbarDirective;

  public photos: any[];
  public arrayForLoops = [0, 1, 2];

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

  filterPhotosIntoThreeRows(num: number) {
    return (this.photos || []).filter((_, i) => i % 3 === num);
  }

  async handleDownloadClicked(photo) {
    const blob = await fetch(photo.urls.full).then(r => r.blob());
    const link = document.createElement('a');
    link.download = `${photo.id}.jpg`;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
