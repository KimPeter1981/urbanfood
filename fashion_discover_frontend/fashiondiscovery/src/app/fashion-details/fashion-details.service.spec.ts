import { TestBed } from '@angular/core/testing';

import { FashionDetailsService } from './fashion-details.service';

describe('FashionDetailsService', () => {
  let service: FashionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
