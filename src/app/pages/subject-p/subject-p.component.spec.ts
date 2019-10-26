import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPComponent } from './subject-p.component';

describe('SubjectPComponent', () => {
  let component: SubjectPComponent;
  let fixture: ComponentFixture<SubjectPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
