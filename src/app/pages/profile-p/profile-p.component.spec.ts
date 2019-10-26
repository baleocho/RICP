import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePComponent } from './profile-p.component';

describe('ProfilePComponent', () => {
  let component: ProfilePComponent;
  let fixture: ComponentFixture<ProfilePComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
