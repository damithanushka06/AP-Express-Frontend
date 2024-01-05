import { TestBed } from '@angular/core/testing';

import { AppGroupService } from './app-group.service';

describe('AppGroupService', () => {
  let service: AppGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
