import { TestBed } from '@angular/core/testing';

import { ErrorsHendlerService } from './errors-hendler.service';

describe('ErrorsHendlerService', () => {
  let service: ErrorsHendlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsHendlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
