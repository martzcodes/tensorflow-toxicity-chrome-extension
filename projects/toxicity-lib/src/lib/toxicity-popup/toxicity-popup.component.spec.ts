import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityPopupComponent } from './toxicity-popup.component';

describe('ToxicityPopupComponent', () => {
  let component: ToxicityPopupComponent;
  let fixture: ComponentFixture<ToxicityPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicityPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
