import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {

  @Output() public readonly queryChanged: EventEmitter<string> = new EventEmitter();

  private readonly LAG_AFTER_INPUT = 350;
  private _timeout: number;

  public query: string;

  constructor( ) { }

  // while you are typing frequently it will wait,
  // but once you will pause in LAG_AFTER_INPUT ms a search request will be performed
  handleQueryChanged() {

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this.queryChanged.emit(this.query);
    }, this.LAG_AFTER_INPUT);
  }
}
