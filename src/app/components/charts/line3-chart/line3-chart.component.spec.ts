import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Line3ChartComponent } from './line3-chart.component';

describe('Line3ChartComponent', () => {
  let component: Line3ChartComponent;
  let fixture: ComponentFixture<Line3ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Line3ChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Line3ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
