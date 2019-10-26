import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCComponent } from './nav-bar-c.component';

describe('NavBarCComponent', () => {
  let component: NavBarCComponent;
  let fixture: ComponentFixture<NavBarCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
