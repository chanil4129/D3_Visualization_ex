import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Line2ChartComponent } from './line2-chart.component';

describe('Line2ChartComponent', () => {
  let component: Line2ChartComponent;
  let fixture: ComponentFixture<Line2ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Line2ChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Line2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
