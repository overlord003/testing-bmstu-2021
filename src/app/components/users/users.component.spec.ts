import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';


import { UsersComponent } from './users.component';

import { of } from 'rxjs';


const dummyUsers = [
  { id: 0, name: 'First', lastname: 'User', role: 'Tester' },
  { id: 1, name: 'Second', lastname: 'User', role: 'Tester' }
];

class FakeUserSerivce {
  getUsers() {
    return of(dummyUsers);
  }
}


describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async (() => {
    let userService: UserService;

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ UsersComponent ],
      providers: [
        { provide: UserService, useClass: FakeUserSerivce }
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
