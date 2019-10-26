import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPComponent } from './dashboard-p.component';

describe('DashboardPComponent', () => {
  let component: DashboardPComponent;
  let fixture: ComponentFixture<DashboardPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
