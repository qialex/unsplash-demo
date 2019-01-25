import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UnsplashApiService, UnsplashSingleton } from '../../services';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { UserInterface } from '../../model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss', './user-single.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @ViewChild(PerfectScrollbarDirective) public readonly ps: PerfectScrollbarDirective;

  private readonly _subs: any[] = [];
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
  ) {
    this._subs.push(this.unsplashSingleton.userSelectedObservable.subscribe((userSelected: UserInterface) => {
      this.userSelected = userSelected;
    }));
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

  public ngOnInit(): void {
    this.handleQueryChanged('');
  }

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
    if (this.userSelected && this.userSelected.id !== user.id) {
      this.unsplashSingleton.photosGetByUser(user);
    } else {
      this.unsplashSingleton.deselectUser();
    }
  }

  public handlePsYReachEnd() {

    const geometry = this.ps.geometry();

    if (geometry.y) {

      this.usersGetMore();
    }
  }

  public isMessageTypeSomething(): boolean {
    return !this.users.length && !this._queryPrevious;
  }

  public isMessageNoUser(): boolean {
    return !this.users.length && !!this._queryPrevious;
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

  public ngOnDestroy(): void {
    this._subs.map(_ => _.unsubscribe());
  }
}
