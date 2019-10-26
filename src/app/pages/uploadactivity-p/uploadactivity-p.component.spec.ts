import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadactivityPComponent } from './uploadactivity-p.component';

describe('UploadactivityPComponent', () => {
  let component: UploadactivityPComponent;
  let fixture: ComponentFixture<UploadactivityPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadactivityPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadactivityPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
