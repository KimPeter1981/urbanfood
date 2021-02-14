import { TestBed } from '@angular/core/testing';

import { FashionSuggestService } from './fashion-suggest.service';

describe('FashionSuggestService', () => {
  let service: FashionSuggestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FashionSuggestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
