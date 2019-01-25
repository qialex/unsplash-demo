import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class PhotoGridComponent implements OnInit, OnDestroy {

  @ViewChild(PerfectScrollbarDirective) public readonly ps: PerfectScrollbarDirective;

  private readonly _subs: any[] = [];
  public photos: PhotoInterface[];
  public userSelected: UserInterface;
  public arrayForLoops = [0, 1, 2];

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private unsplashSingleton: UnsplashSingleton,
  ) {
    this._subs.push(this.unsplashSingleton.photosObservable.subscribe((photos: PhotoInterface[]) => {
      this.photos = photos;
      this.userSelected = this.unsplashSingleton.userSelected;
      this.ref.detectChanges();
    }));
  }

  ngOnInit() {
    this.unsplashSingleton.photosGetMore();
  }

  handlePsYReachEnd(): void {

    const geometry = this.ps.geometry();

    if (geometry.y) {

      this.unsplashSingleton.photosGetMore();
    }
  }

  handleDeselect() {
    this.unsplashSingleton.deselectUser();
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

  public ngOnDestroy(): void {
    this._subs.map(_ => _.unsubscribe());
  }
}
