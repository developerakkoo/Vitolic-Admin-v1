import { TestBed } from '@angular/core/testing';

import { DeliverBoyService } from './deliver-boy.service';

describe('DeliverBoyService', () => {
  let service: DeliverBoyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverBoyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
