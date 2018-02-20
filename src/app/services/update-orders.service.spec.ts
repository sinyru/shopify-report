import { TestBed, inject } from '@angular/core/testing';

import { UpdateOrdersService } from './update-orders.service';

describe('UpdateOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateOrdersService]
    });
  });

  it('should be created', inject([UpdateOrdersService], (service: UpdateOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
