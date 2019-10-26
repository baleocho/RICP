import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPComponent } from './login-p.component';

describe('LoginPComponent', () => {
  let component: LoginPComponent;
  let fixture: ComponentFixture<LoginPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
