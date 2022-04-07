import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-brush-zoom',
  templateUrl: './brush-zoom.component.html',
  styleUrls: ['./brush-zoom.component.scss']
})
export class BrushZoomComponent implements OnInit {
  @ViewChild('rootSvg', { static: false }) svg: ElementRef | undefined;

  svgRoot: any;
  constructor() { }

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnInit(): void {
  }

  render(): void {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

    this.svgRoot = d3.select(this.svg?.nativeElement)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const svg = this.svgRoot.append('g').attr('class', 'container');

    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
      // 변수 mapping
      (d: any) => {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
      }).then(

        function (data) {
          //X축
          const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date) as any)
            .range([0, width]);
          const xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

          //Y축
          const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.value) as number])
            .range([height, 0]);
          const yAxis = svg.append("g")
            .call(d3.axisLeft(y));

          // brush 구간 설정
          const clip = svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

          // brush 추가
          const brush = d3.brushX()
            .extent([[0, 0], [width, height]])  // 브러시 하는 부분 조정
            .on("end", updateChart)               // brush 될 때마다 차트 업데이트

          // 영역 차트
          const area = svg.append('g')
            .attr("clip-path", "url(#clip)")

          // 영역 차트 데이터
          const areaGenerator = d3.area()
            .x((d: any) => x(d.date))
            .y0(y(0))   //질문..없으면 색 반전
            .y1((d: any) => y(d.value))

          // area 그리기
          area.append("path")
            .datum(data)
            .attr("class", "myArea")  //브러쉬 할때마다 바껴야됨
            .attr("fill", "#69b3a2")  //초록색 채우기
            .attr("fill-opacity", .3) //투명도
            .attr("stroke", "black")  //선
            .attr("stroke-width", 1)  //확대를 해도 선의 두께 고정
            .attr("d", areaGenerator) //데이터 설정해둔거

          // brush 기능 추가
          area
            .append("g")
            .attr("class", "brush")
            .call(brush);

          // 드래그 하는 시간??
          let idleTimeout: any
          function idled() { idleTimeout = null; }

          // brush에 따라 차트 업데이트
          function updateChart(event: any): any {

            // 범위 고르는것
            const extent = event.selection

            if (!extent) {  //선택 안하면 초기 좌표
              if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
              x.domain([4, 8])  //질문.. x축 도메인 어떻게 맵핑되는지..
            } else {  //선택하면 x축 도메인 업데이트
              x.domain([x.invert(extent[0]), x.invert(extent[1])])
              area.select(".brush").call(brush.move, null) //선택되고 나면 브러시 안보이게 하기
            }

            // x축 업데이트
            xAxis.transition().duration(1000).call(d3.axisBottom(x))
            area  //차트 업데이트
              .select('.myArea')
              .transition()
              .duration(1000)
              .attr("d", areaGenerator)
          }

          // 더블클릭 누르면 초기화
          svg.on("dblclick", function () {
            x.domain(d3.extent(data, d => d.date) as any)
            xAxis.transition().call(d3.axisBottom(x))
            area
              .select('.myArea')
              .transition()
              .attr("d", areaGenerator)
          });

        })
  }
}
