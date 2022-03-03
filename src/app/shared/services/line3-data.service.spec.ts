import { TestBed } from '@angular/core/testing';

import { Line3DataService } from './line3-data.service';

describe('Line3DataService', () => {
  let service: Line3DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Line3DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
