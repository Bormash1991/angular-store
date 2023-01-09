import { TestBed } from '@angular/core/testing';

import { CloseOrOpenBarService } from './close-or-open-bar.service';

describe('CloseOrOpenBarService', () => {
  let service: CloseOrOpenBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseOrOpenBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
