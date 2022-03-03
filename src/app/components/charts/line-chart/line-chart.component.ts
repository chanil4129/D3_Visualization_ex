import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  private svg : any;    //D3가 DOM에 그리는 SVG 이미지를 저장하는데 사용
  private margin = 50;    //라인 기준으로 margin
  private width = 750 - (this.margin * 2);    //전체 그림 너비
  private height = 400 - (this.margin * 2);   //전체 그림 높이

  constructor() { }

  ngOnInit(): void {
    d3.csv("/assets/data/line.csv").then(data => this.render(data));    //csv 파일로부터 데이터 불러오기
  }

  private render(data: any[]): void {   
    this.svg = d3.select("#line")    //html element에 직접적 접근
    .attr("width", this.width + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림
    .attr("height", this.height + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림
    .append("g")    //g element로 바뀜
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.year))
    .padding(0.2);    //막대 그래프 간격(0이면 막대가 따닥따닥 붙어있음)

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")    
    .call(d3.axisBottom(x))   //x축 위치
    .selectAll("text")

    // Create the Y-axis band scales
    const y = d3.scaleLinear()
    .domain([0, d3.max(data,(d)=>d.value) as unknown as number])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));    //y축 위치

    
    this.svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r",5)
    .attr("cx",(d: { year: string; })=>x(d.year))
    .attr("cy",(d: { value: d3.NumberValue; })=>y(d.value))
    .style("fill","red");

    const linearGenerator=d3.line()
    .x((d:any)=>x(d.year) as any)
    .y((d:any)=>y(d.value));

    this.svg.append("path")
    .attr("d",linearGenerator(data))
    .attr("fill","none")
    .attr("stroke-width",2)
    .attr("stroke","black")
  }


}
