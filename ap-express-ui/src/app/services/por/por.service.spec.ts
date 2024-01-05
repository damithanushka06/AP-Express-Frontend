import { TestBed } from '@angular/core/testing';

import { PorService } from './por.service';

describe('PorService', () => {
  let service: PorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
