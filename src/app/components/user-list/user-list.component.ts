import {Component, OnInit} from '@angular/core';
import { UnsplashSingleton } from '../../services';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {

  public readonly users: any[] = this.unsplashSingleton.users;

  constructor(
    private unsplashSingleton: UnsplashSingleton,
  ) { }

  ngOnInit(): void {

  }

  handleUserClick(user: any) {
    this.unsplashSingleton.getUserPhoto(user);
  }
}
