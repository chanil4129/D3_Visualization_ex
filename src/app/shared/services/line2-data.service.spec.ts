import { TestBed } from '@angular/core/testing';

import { Line2DataService } from './line2-data.service';

describe('Line2DataService', () => {
  let service: Line2DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Line2DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
