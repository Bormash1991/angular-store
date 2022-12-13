import { TestBed } from '@angular/core/testing';

import { AddItemDetailsService } from './add-item-details.service';

describe('AddItemDetailsService', () => {
  let service: AddItemDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddItemDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
