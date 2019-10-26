import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsPComponent } from './subjects-p.component';

describe('MateriasPComponent', () => {
  let component: SubjectsPComponent;
  let fixture: ComponentFixture<SubjectsPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
