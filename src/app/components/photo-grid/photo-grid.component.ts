import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UnsplashSingleton } from '../../services';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { PhotoInterface, UserInterface } from '../../model';
import { PhotoSingleComponent } from '..';


@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.html',
  styleUrls: ['./photo-grid.scss', '../user-list/user-single.scss']
})
export class PhotoGridComponent {

  @ViewChild(PerfectScrollbarDirective) public readonly ps: PerfectScrollbarDirective;

  public photos: PhotoInterface[];
  public userSelected: UserInterface;
  public arrayForLoops = [0, 1, 2];
  public firstTime = true;

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private unsplashSingleton: UnsplashSingleton,
  ) {
    this.unsplashSingleton.photosObservable.subscribe((photos: any[]) => {
      this.photos = photos;
      this.userSelected = this.unsplashSingleton.userSelected;
      this.ref.detectChanges();
      this.firstTime = false;
    });
  }

  handlePsYReachEnd(): void {

    const geometry = this.ps.geometry();

    if (geometry.y) {

      this.unsplashSingleton.photosGetMore();
    }
  }

  filterPhotosIntoThreeRows(num: number): PhotoInterface[] {
    return (this.photos || []).filter((_, i) => i % 3 === num);
  }

  async handleDownloadClicked(photo: PhotoInterface) {
    const blob = await fetch(photo.urls.full).then(r => r.blob());
    const link = document.createElement('a');
    link.download = `${photo.id}.jpg`;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  handlePhotoClick(event: any, photo: PhotoInterface): void {
    if (event.target.classList.contains(`photo-hover`)) {
      this.router.navigate(['/photo-single', photo.id], {skipLocationChange: true});
    }
  }

  handleActivate(event: PhotoSingleComponent): void {
    event.photo = this.photos.find(photo => photo.id === event.photoIdFromRoute);
  }
}
