import { TestBed } from '@angular/core/testing';

import { ToxicityLibService } from './toxicity-lib.service';

describe('ToxicityLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToxicityLibService = TestBed.get(ToxicityLibService);
    expect(service).toBeTruthy();
  });
});
