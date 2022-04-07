import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from "@angular/material/select";
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { Bar2ChartComponent } from './components/charts/bar2-chart/bar2-chart.component';
import { Bar3ChartComponent } from './components/charts/bar3-chart/bar3-chart.component';
import { Line2ChartComponent } from './components/charts/line2-chart/line2-chart.component';
import { Line3ChartComponent } from './components/charts/line3-chart/line3-chart.component';
import { TreemapComponent } from './components/charts/treemap/treemap.component';
import { ZoomableTreemapComponent } from './components/charts/zoomable-treemap/zoomable-treemap.component';
import { BrushZoomComponent } from './components/charts/brush-zoom/brush-zoom.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    BarChartComponent,
    LineChartComponent,
    Bar2ChartComponent,
    Bar3ChartComponent,
    Line2ChartComponent,
    Line3ChartComponent,
    TreemapComponent,
    ZoomableTreemapComponent,
    BrushZoomComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
