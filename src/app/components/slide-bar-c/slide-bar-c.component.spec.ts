import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBarCComponent } from './slide-bar-c.component';

describe('SlideBarCComponent', () => {
  let component: SlideBarCComponent;
  let fixture: ComponentFixture<SlideBarCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideBarCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBarCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
