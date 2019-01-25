import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoInterface } from '../../model';


@Component({
  selector: 'app-photo-single',
  templateUrl: './photo-single.html',
  styleUrls: ['./photo-single.scss']
})
export class PhotoSingleComponent implements OnInit, OnDestroy {

  private _subs: any[] = [];

  public photo: PhotoInterface;
  public photoIdFromRoute: string;
  public display = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this._subs.push(activatedRoute.params.subscribe(params => {
      this.photoIdFromRoute = params.photoId;
    }));
  }

  ngOnInit() {
    setTimeout(() => {
      this.display = true;
    });
  }

  handleClose(event?): void {
    if (!event || event.target.classList.contains(`photo-single-component`)) {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

  ngOnDestroy(): void {
    this._subs.map(_ => _.unsubscribe());
  }
}
