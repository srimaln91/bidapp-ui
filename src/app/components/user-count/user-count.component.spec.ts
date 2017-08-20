import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountComponent } from './user-count.component';

describe('UserCountComponent', () => {
  let component: UserCountComponent;
  let fixture: ComponentFixture<UserCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
