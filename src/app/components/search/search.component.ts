import { Component } from '@angular/core';
import { UnsplashSingleton } from '../../services';


@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {

  private readonly LAG_AFTER_INPUT = 350;
  private _timeout: number;

  queryPrevious: string;
  query: string;

  constructor(
    private unsplashSingleton: UnsplashSingleton,
  ) { }

  // while you are typing frequently it will wait,
  // but once you will pause in LAG_AFTER_INPUT ms a search request will be performed
  handleQueryChanged() {

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this.unsplashSingleton.usersSearch(this.query, this.queryPrevious);
      this.queryPrevious = this.query;
    }, this.LAG_AFTER_INPUT);
  }
}
