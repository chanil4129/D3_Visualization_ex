import { TestBed } from '@angular/core/testing';

import { ZoomableTreemapService } from './zoomable-treemap.service';

describe('ZoomableTreemapService', () => {
  let service: ZoomableTreemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomableTreemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
