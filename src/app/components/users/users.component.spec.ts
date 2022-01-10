import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { UsersComponent } from './users.component';
import { UserService } from 'src/app/services/user-service/user.service';
import { SortTypes } from 'src/app/models/sort-types.model';



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
  let spy: jasmine.Spy;

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
        UserService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.debugElement.componentInstance;
    service = fixture.debugElement.injector.get(UserService);
    spy = spyOn(service, "getUsers").and.returnValue(of(dummyUsers));
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
