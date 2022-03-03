import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar3-chart',
  templateUrl: './bar3-chart.component.html',
  styleUrls: ['./bar3-chart.component.scss']
})
export class Bar3ChartComponent implements OnInit {
  private svg : any;    //D3가 DOM에 그리는 SVG 이미지를 저장하는데 사용
  private margin = 50;    //라인 기준으로 margin
  private width = 750 - (this.margin * 2);    //전체 그림 너비
  private height = 400 - (this.margin * 2);   //전체 그림 높이

  constructor() { }

  ngOnInit(): void {
    d3.csv("/assets/data/bar3.csv").then(data => this.render(data));    //csv 파일로부터 데이터 불러오기
  }

  private render(data: any[]): void {   
    this.svg = d3.select("#bar3")    //html element에 직접적 접근
    .attr("width", this.width + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림
    .attr("height", this.height + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림
    .append("g")    //g element로 바뀜
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Name))
    .padding(0.2);    //막대 그래프 간격(0이면 막대가 따닥따닥 붙어있음)

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")    
    .call(d3.axisBottom(x))   //x축 위치
    .selectAll("text")

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 100])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));    //y축 위치

    // Create and fill the bars
    this.svg.selectAll("dot")
    .data(data)
    .enter()    //element 자동추가(data 있는만큼)
    .append("rect")
    .attr("x", (d: { Name: string; }) => x(d.Name))
    .attr("y", (d: { Score: number; }) => y(d.Score))
    .attr("width", x.bandwidth())
    .attr("height", (d: { Score: number; }) => this.height - y(d.Score))
  }
}
