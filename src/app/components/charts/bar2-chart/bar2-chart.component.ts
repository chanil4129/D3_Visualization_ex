import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar2-chart',
  templateUrl: './bar2-chart.component.html',
  styleUrls: ['./bar2-chart.component.scss']
})
export class Bar2ChartComponent implements OnInit {
  private width = 600;
  private height = 500;
  private margin = 200;
  svg: any;


  constructor() { }

  ngOnInit(): void {
    d3.csv("/assets/data/bar2.csv").then(data => this.render(data));
  }

  render(data: any): void {
    const svg = d3.select("svg")
      .attr("width", this.width + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림
      .attr("height", this.height + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림

    const xScale = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((d: { year: any; }) => d.year))
      .padding(0.4);

    const yScale = d3.scaleLinear()
      .range([this.height, 0])
      .domain([0, d3.max(data, (d: any) => d.value) as unknown as number]);

    const g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    g.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(xScale))
      .attr("y", this.height - 250)
      .attr("x", this.width - 100)

    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat((d) => "$" + d).ticks(10))
      .append("text")
      .attr("transform", "rotate(-90)") 

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: any) => xScale(d.year) as any)
      .attr("y", (d: any) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d: any) => this.height - yScale(d.value));
  };

}
