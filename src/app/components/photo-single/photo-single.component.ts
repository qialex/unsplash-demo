import { Component, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-photo-single',
  templateUrl: './photo-single.html',
  styleUrls: ['./photo-single.scss']
})
export class PhotoSingleComponent implements OnDestroy {

  private _subs: any[] = [];

  public photo: any;
  public photoIdFromRoute: string;
  public loading = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this._subs.push(activatedRoute.params.subscribe(params => {
      this.photoIdFromRoute = params.photoId;
    }));
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
