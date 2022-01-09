import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../../models/user.model';
import { SortTypes } from 'src/app/models/sort-types.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public sortUsers(users: User[], compareFunction: any) {  
    if (!users || !users.length) {
      return;
    }

    if (!compareFunction || typeof compareFunction !== 'function') {
      return;
    }

    users.sort(compareFunction);
  };

  public getCompareFunction(sortType: typeof SortTypes.ID | typeof SortTypes.NAME) {
    switch(sortType) {
      case SortTypes.ID:
        return this.compareById;
      case SortTypes.NAME:
        return this.compareByName;
      default:
        return;
    }
  };

  public compareByName(first: User, second: User): number {
    if (!first || !second) {
      return 0;
    }

    if (first.lastname.toLowerCase() > second.lastname.toLowerCase()) {
      return 1;
    } else if (first.lastname.toLowerCase() < second.lastname.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  }

  public compareById(first: User, second: User): number {
    if (!first || !second) {
      return 0;
    }

    if (first.id > second.id) {
      return 1;
    } else if (first.id < second.id) {
      return -1;
    } else {
      return 0;
    }
  }

}
