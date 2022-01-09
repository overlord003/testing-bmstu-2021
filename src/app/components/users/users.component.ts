import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../models/user.model';
import { SortTypes } from 'src/app/models/sort-types.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // For select
  public values = [
    {id: SortTypes.ID, title: "by id"},
    {id: SortTypes.NAME, title: "by name"}
  ];
  public selectedValue = this.values[0];

  // For list of users
  public usersListSubs!: Subscription;
  public usersList: User[] = [];

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.usersListSubs = this.userService
      .getUsers()
      .subscribe(res => {
          this.usersList = res;
        }
      );
  }

  public onSelection(): void {
    this.userService
      .sortUsers(
        this.usersList,
        this.userService
          .getCompareFunction(this.selectedValue.id)
    );
  }

  public ngOnDestroy() {
    this.usersListSubs.unsubscribe();
  }

}
