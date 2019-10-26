import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderPComponent } from './calender-p.component';

describe('CalenderPComponent', () => {
  let component: CalenderPComponent;
  let fixture: ComponentFixture<CalenderPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
