import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bar2ChartComponent } from './bar2-chart.component';

describe('Bar2ChartComponent', () => {
  let component: Bar2ChartComponent;
  let fixture: ComponentFixture<Bar2ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bar2ChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bar2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
