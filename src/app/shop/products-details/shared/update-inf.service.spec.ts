import { TestBed } from '@angular/core/testing';

import { UpdateInfService } from './update-inf.service';

describe('UpdateInfService', () => {
  let service: UpdateInfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateInfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
