import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';   //d3 모듈 불러오기

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private data = [300,130,5,60,240];
  private svg : any;    //D3가 DOM에 그리는 SVG 이미지를 저장하는데 사용
  private margin = 50;    //라인 기준으로 margin
  private width = 750 - (this.margin * 2);    //전체 그림 너비
  private height = 200 - (this.margin * 2);   //전체 그림 높이

  constructor() { }

  ngOnInit(): void {
    this.svg = d3.select("div#bar")    //html element에 직접적 접근
    .append("svg")    //svg element로 바뀜
    .attr("width", this.width + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림
    .attr("height", this.height + (this.margin * 2))    //크기를 줄일 경우 비율이 줄어드는게 아니라 짤림
    .append("g")    //g element로 바뀜
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    this.drawBars(this.data);
  }

  private drawBars(data: any[]): void {
    const xScale=d3.scaleLinear()
    .domain([0,300])
    .range([0,300])

    this.svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",0)
    .attr("y",(d: string,i: any)=>i*25+"px")
    .attr("height","20px")    //막대그래프의 높이를 20px로 지정
    .attr("width","0px")    //최초 막대그래프의 넓이를 0px로 지정
    .transition()   //애니메이션
    .delay((d: any,i: number)=>i*500)   //0.5초마다 그리도록 대기 시간 설정
    .duration(2500)   //2.5초에 걸쳐 애니메이션화함
    .attr("width",(d: string,i: any)=>d+"px")
    .attr("height","20px")

    d3.select("#updateButton").on("click", ()=>{
      for(var i=0;i<data.length;i++){
        data[i]=Math.floor(Math.random()*320);
      }
      d3.select("#bar")
        .selectAll("rect")
        .data(data)
        .transition()   //애니메이션
        .duration(1500)
        .attr("width",(d,i)=>d+"px")
    })

    this.svg.append("g")
    .attr("transform","translate(0,"+((1+data.length)*20+5)+")")
    .call(d3.axisBottom(xScale)) 
  }

}
