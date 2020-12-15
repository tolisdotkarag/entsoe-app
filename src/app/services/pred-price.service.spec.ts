import { TestBed } from '@angular/core/testing';

import { PredPriceService } from './pred-price.service';

describe('PredPriceService', () => {
  let service: PredPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
