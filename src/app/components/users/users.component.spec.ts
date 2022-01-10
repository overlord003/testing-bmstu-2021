import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { UsersComponent } from './users.component';
import { UserService } from 'src/app/services/user-service/user.service';


const dummyUsers = [
  { id: 0, name: 'Christina', lastname: 'Lovtsova', role: 'Tester' },
  { id: 1, name: 'Daria', lastname: 'Zhguleva', role: 'Tester' },
  { id: 2, name: 'Harry', lastname: 'Potter', role: 'Magician' },
  { id: 3, name: 'Hermione', lastname: 'Granger', role: 'Magician' },
  { id: 4, name: 'Ron', lastname: 'Weasley', role: 'Magician' }
];


describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let service: UserService;

  const fakeHttpService = {
    get: () => of(dummyUsers)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        UsersComponent
      ],
      providers: [
        UserService,
        {provide: HttpClient, useValue: fakeHttpService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.debugElement.componentInstance;
    service = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(component.usersList).toEqual(dummyUsers);
  });
});
