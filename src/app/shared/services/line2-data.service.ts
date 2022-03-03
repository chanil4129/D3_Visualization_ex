import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { IData } from 'src/app/components/charts/line2-chart/line2-chart.component';

@Injectable({
  providedIn: 'root'
})
export class Line2DataService {
  dataSource: any ;

  public linedata=new Subject<any>();
  public linedata$=this.linedata.asObservable();

  public clickToSend=new Subject<IData>();
  public clickToSend$=this.clickToSend.asObservable();
  constructor() {
    d3.csv("/assets/data/line.csv").then((data:any)=>{
      this.dataSource=data;

      this.linedata.next(this.dataSource);
    })
  }
}
