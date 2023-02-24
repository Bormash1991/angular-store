import { TestBed } from '@angular/core/testing';

import { DetailsGuard } from './details.guard';

describe('DetailsGuard', () => {
  let guard: DetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
