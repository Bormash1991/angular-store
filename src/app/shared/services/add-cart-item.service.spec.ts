import { TestBed } from '@angular/core/testing';

import { AddCartItemService } from './add-cart-item.service';

describe('AddCartItemService', () => {
  let service: AddCartItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCartItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
