import { HttpClient } from '@angular/common/http';
import { of} from 'rxjs';

import { User } from 'src/app/models/user.model';
import { UserService } from '../user-service/user.service';


import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


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

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUsers', () => {
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
    });
  });

});
