import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityContainerComponent } from './toxicity-container.component';

describe('ToxicityContainerComponent', () => {
  let component: ToxicityContainerComponent;
  let fixture: ComponentFixture<ToxicityContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicityContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
