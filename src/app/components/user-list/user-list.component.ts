import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UnsplashApiService, UnsplashSingleton } from '../../services';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { UserInterface } from '../../model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss', './user-single.scss']
})
export class UserListComponent {

  @ViewChild(PerfectScrollbarDirective) public readonly ps: PerfectScrollbarDirective;

  private readonly PER_PAGE_USERS: number = 15;
  private _allLoaded: boolean;
  private _queryPrevious: string;

  public users: UserInterface[] = [];
  public userSelected: UserInterface = {} as UserInterface;
  public loading: boolean;

  constructor(
    private unsplashSingleton: UnsplashSingleton,
    private unsplashApiService: UnsplashApiService,
    private ref: ChangeDetectorRef
  ) { }

  public handleQueryChanged(query: string) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.unsplashApiService.apiUserSearch(query, this.PER_PAGE_USERS, 1).subscribe((data: any) => {
      if (this._queryPrevious !== query) {
        this._usersRefresh();
      }
      this._usersAddOrNothing(data.results);
      this._queryPrevious = query;
      this.loading = false;
    });
  }

  public handleUserClick(user: UserInterface) {
    this.userSelected = user;
    this.unsplashSingleton.photosGetByUser(user);
  }

  public handlePsYReachEnd() {

    const geometry = this.ps.geometry();

    if (geometry.y) {

      this.usersGetMore();
    }
  }

  public usersGetMore() {
    if (this.loading) {
      return;
    }
    const page: number = ( ( this.users.length / this.PER_PAGE_USERS ) << 0 ) + 1;
    this.loading = true;
    this.unsplashApiService.apiUserSearch(this._queryPrevious, this.PER_PAGE_USERS, page).subscribe((data: any) => {
      this._usersAddOrNothing(data.results);
      this.ref.detectChanges();
      this.loading = false;
    });
  }

  private _usersAddOrNothing(users: UserInterface[]): void {
    if (!users.length) {
      this._allLoaded = true;
    } else {
      this.users.push(...users);
    }
  }

  private _usersRefresh(): void {
    this.users.length = 0;
    this._allLoaded = false;
  }
}
