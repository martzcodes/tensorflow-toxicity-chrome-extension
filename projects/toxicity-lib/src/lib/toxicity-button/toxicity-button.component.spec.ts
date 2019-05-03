import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityButtonComponent } from './toxicity-button.component';

describe('ToxicityButtonComponent', () => {
  let component: ToxicityButtonComponent;
  let fixture: ComponentFixture<ToxicityButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicityButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
