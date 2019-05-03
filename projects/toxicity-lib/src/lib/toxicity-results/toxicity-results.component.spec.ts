import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityResultsComponent } from './toxicity-results.component';

describe('ToxicityResultsComponent', () => {
  let component: ToxicityResultsComponent;
  let fixture: ComponentFixture<ToxicityResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicityResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
