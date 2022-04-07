import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit, AfterViewInit {
  @ViewChild('rootSvg', { static: false }) svg: ElementRef | undefined;

  svgRoot: any;
  constructor() { }

  ngAfterViewInit(): void{
    this.render();
  }

  ngOnInit(): void {
  }

  render(): void{
    const margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 445 - margin.left - margin.right,
    height = 445 - margin.top - margin.bottom;

    this.svgRoot = d3.select(this.svg?.nativeElement)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      `translate(${margin.left}, ${margin.top})`);

    const svg=this.svgRoot.append('g').attr('class','container');

    // read json data
    d3.json("/assets/data/treemap.json").then(function (data) {

      // Give the data to this cluster layout:
      const root = d3.hierarchy(data).sum( (d:any)=> d.value) // Here the size of each leave is given in the 'value' field in input data

      // Then d3.treemap computes the position of each element of the hierarchy
      d3.treemap()
        .size([width, height])
        .padding(2)
        (root)

      // use this information to add rectangles:
      svg
        .selectAll("rect")
        .data(root.leaves())
        .join("rect")
        .attr('x', (d:any)=> d.x0)
        .attr('y', (d:any)=> d.y0)
        .attr('width', (d:any)=>d.x1 - d.x0)
        .attr('height', (d:any)=>d.y1 - d.y0)
        .style("stroke", "black")
        .style("fill", "slateblue")

      // and to add the text labels
      svg
        .selectAll("text")
        .data(root.leaves())
        .join("text")
        .attr("x", (d:any)=>d.x0 + 5 )    // +10 to adjust position (more right)
        .attr("y", (d:any)=>d.y0 + 20 )    // +20 to adjust position (lower)
        .text((d:any)=> d.data.name )
        .attr("font-size", "15px")
        .attr("fill", "white")
    })

  }
}
