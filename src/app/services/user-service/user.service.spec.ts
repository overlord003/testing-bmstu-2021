import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from '../user-service/user.service';
import { SortTypes } from "../../models/sort-types.model";


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
        { id: 0, name: 'First', lastname: 'User', role: 'Tester' },
        { id: 1, name: 'Second', lastname: 'User', role: 'Tester' }
      ];
    
      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });
    
      const req = httpMock.expectOne('api/users');
      expect(req.request.method).toBe("GET");

      req.flush(dummyUsers);

      httpMock.verify();
    });
  });

  describe('compareById', () => {
    it('1st user id < 2nd user id', () => {
      const dummyUsers = [
        { id: 0, name: 'First', lastname: 'User', role: 'Tester' },
        { id: 1, name: 'Second', lastname: 'User', role: 'Tester' }
      ];
      expect(service.compareById(dummyUsers[0], dummyUsers[1])).toBe(-1);
    });

    it('1st user id == 2nd user id', () => {
      const dummyUsers = [
        { id: 0, name: 'First', lastname: 'User', role: 'Tester' },
        { id: 0, name: 'Second', lastname: 'User', role: 'Tester' }
      ];
      expect(service.compareById(dummyUsers[0], dummyUsers[1])).toBe(0);
    });

    it('1st user id > 2nd user id', () => {
      const dummyUsers = [
        { id: 1, name: 'First', lastname: 'User', role: 'Tester' },
        { id: 0, name: 'Second', lastname: 'User', role: 'Tester' }
      ];
      expect(service.compareById(dummyUsers[0], dummyUsers[1])).toBe(1);
    });

  });

  describe('compareByName', () => {
    it('1st user fullName < 2nd user fullName, names differ', () => {
      const dummyUsers = [
        { id: 0, name: 'First', lastname: 'User', role: 'Tester' },
        { id: 1, name: 'Second', lastname: 'User', role: 'Tester' }
      ];
      expect(service.compareByName(dummyUsers[0], dummyUsers[1])).toBe(-1);
    });

    it('1st user fullName == 2nd user fullName', () => {
      const dummyUsers = [
        { id: 0, name: 'UserName', lastname: 'UserSurname', role: 'Tester' },
        { id: 1, name: 'UserName', lastname: 'UserSurname', role: 'Tester' }
      ];
      expect(service.compareByName(dummyUsers[0], dummyUsers[1])).toBe(0);
    });

    it('1st user fullName > 2nd user fullName, names differ', () => {
      const dummyUsers = [
        { id: 1, name: 'Second', lastname: 'User', role: 'Tester' },
        { id: 0, name: 'First', lastname: 'User', role: 'Tester' }
      ];
      expect(service.compareById(dummyUsers[0], dummyUsers[1])).toBe(1);
    });

    it('1st user fullName < 2nd user fullName, names equal', () => {
      const dummyUsers = [
        { id: 0, name: 'UserName', lastname: 'FirstSurname', role: 'Tester' },
        { id: 1, name: 'UserName', lastname: 'SecondSurname', role: 'Tester' }
      ];
      expect(service.compareByName(dummyUsers[0], dummyUsers[1])).toBe(-1);
    });

    it('1st user fullName > 2nd user fullName, names equal', () => {
      const dummyUsers = [
        { id: 1, name: 'UserName', lastname: 'SecondSurname', role: 'Tester' },
        { id: 0, name: 'UserName', lastname: 'FirstSurname', role: 'Tester' }
      ];
      expect(service.compareByName(dummyUsers[0], dummyUsers[1])).toBe(1);
    });
  });

  describe('getCompareFunction', () => {
    it('sort by id', () => {
      expect(service.getCompareFunction(SortTypes.ID)).toBe(service.compareById);
    });

    it('sort by fullName', () => {
      expect(service.getCompareFunction(SortTypes.NAME)).toBe(service.compareByName);
    });

    it('sort by unexpected key', () => {
      expect(service.getCompareFunction('age')).toBeUndefined();
    });
  });

  describe('sortUsers', () => {
    it('sort by id', () => {
      expect(service.sortUsers([], service.compareById)).toBe(undefined);
    })

    it('sort by fullName', () => {
      const dummyUsers = [
        { id: 1, name: 'UserName', lastname: 'SecondSurname', role: 'Tester' },
        { id: 0, name: 'UserName', lastname: 'FirstSurname', role: 'Tester' }
      ];
      expect(service.sortUsers(dummyUsers, null)).toBe(undefined);
    });
  });

});
