import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityLibComponent } from './toxicity-lib.component';

describe('ToxicityLibComponent', () => {
  let component: ToxicityLibComponent;
  let fixture: ComponentFixture<ToxicityLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicityLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
