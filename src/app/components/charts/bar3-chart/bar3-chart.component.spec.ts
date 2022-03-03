import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bar3ChartComponent } from './bar3-chart.component';

describe('Bar3ChartComponent', () => {
  let component: Bar3ChartComponent;
  let fixture: ComponentFixture<Bar3ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bar3ChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bar3ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
