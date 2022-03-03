import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Line2DataService } from 'src/app/shared/services/line2-data.service';
import * as d3 from 'd3';

export interface IData {
  year: number,
  value: number,
}

@Component({
  selector: 'app-line2-chart',
  templateUrl: './line2-chart.component.html',
  styleUrls: ['./line2-chart.component.scss']
})
export class Line2ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('rootSvg', { static: false }) svg: ElementRef | undefined;

  svgRoot: any;
  constructor(private ls: Line2DataService) {
    this.ls.clickToSend$.subscribe((data) => {
      console.log(data);
      if (data.year) {
        d3.selectAll('.line').style('opacity', 1);
      }
      else {
        d3.selectAll('.line').style('opacity', 0.05);
        d3.selectAll('.' + data.year).style('opacity', 1);
      }
    });
  }

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnInit(): void {
  }

  render(): void {
    // set the dimensions and margins of the graph
    const margin = { top: 40, right: 150, bottom: 60, left: 30 }
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    this.svgRoot = d3.select(this.svg?.nativeElement)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const svg = this.svgRoot.append('g').attr('class', 'container');

    d3.csv("/assets/data/line.csv").then((data) => {
      const mouseover = (event: any, d: any) => {
        circle.filter((m: any)=>{
          return m===d;
        })
        .attr("r",10)
        .style("fill","red");
      }
      const mouseout = (event: any, d: any) => {
        circle.attr("r","5")
        .style("fill","black");
      }

      // Create the X-axis band scale
      const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d['year']) as any);
      console.log(data);

      // Draw the X-axis on the DOM
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))   //x축 위치

      // Create the Y-axis band scales
      const y = d3.scaleLinear()
        .domain([0, 700])
        .range([height, 0]);

      // Draw the Y-axis on the DOM
      svg.append("g")
        .call(d3.axisLeft(y));    //y축 위치

      const circle=svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)   //점 크기
        .attr("transform", "translate(70,0)")    //위치 억지로 맞춘거임.. 질문
        .attr("cx", (d: { year: string; }) => x(d.year))
        .attr("cy", (d: { value: d3.NumberValue; }) => y(d.value))
        .style("fill", "black")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

      const linearGenerator = d3.line()
        .x((d: any) => x(d.year) as any)
        .y((d: any) => y(d.value));

      svg.append("path")
        .attr("d", linearGenerator(data as any))
        .attr("transform", "translate(70,0)")    //위치 억지로 맞춘거임.. 질문
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke", "black")

      circle.append('title')
      .text((d: { year: any; value: any; })=>(`year : ${d.year}\n`+`value : ${d.value}`))
    })
  }
}
