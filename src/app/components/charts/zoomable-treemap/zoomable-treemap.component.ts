import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-zoomable-treemap',
  templateUrl: './zoomable-treemap.component.html',
  styleUrls: ['./zoomable-treemap.component.scss']
})
export class ZoomableTreemapComponent implements OnInit, AfterViewInit {
  @ViewChild('rootSvg', { static: false }) svg: ElementRef | undefined;

  svgRoot: any;
  constructor() { }

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnInit(): void {
  }

  render(): void {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 445 - margin.left - margin.right,
    height = 445 - margin.top - margin.bottom;

    this.svgRoot = d3.select(this.svg?.nativeElement)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        `translate(${margin.left}, ${margin.top})`);

    const svg = this.svgRoot.append('g').attr('class', 'container');


    d3.json("/assets/data/zoomable-treemap-data.json").then(function (data) {
      const treemap = (data: any) => d3.treemap()
        .tile(tile)
        (d3.hierarchy(data)
          .sum((d: { value: any; }) => d.value)
          .sort((a, b) => (b.value) as number - ((a.value) as number)))


      function tile(node: any, x0: any, y0: any, x1: any, y1: any) {
        d3.treemapBinary(node, 0, 0, width, height);
        for (const child of node.children) {
          child.x0 = x0 + child.x0 / width * (x1 - x0);
          child.x1 = x0 + child.x1 / width * (x1 - x0);
          child.y0 = y0 + child.y0 / height * (y1 - y0);
          child.y1 = y0 + child.y1 / height * (y1 - y0);
        }
      }

      const name = (d: { ancestors: () => any[]; }) => d.ancestors().reverse().map(d => d.data.name).join("/")
      const format = d3.format(",d")

      const x = d3.scaleLinear().rangeRound([0, width]);
      const y = d3.scaleLinear().rangeRound([0, height]);

      svg.create("svg")
        .attr("viewBox", [0.5, -30.5, width, height + 30])
        .style("font", "10px sans-serif");

      let group = svg.append("g")
        .call(render, treemap(data));

      function render(group: any, root: any) {
        const node = group
          .selectAll("g")
          .data(root.children.concat(root))
          .join("g");

        node.filter((d: { parent: any; children: any; }) => d === root ? d.parent : d.children)
          .attr("cursor", "pointer")
          .on("click", (event: any, d: any) => d === root ? zoomout(root) : zoomin(d));

        node.append("title")
          .text((d: any) => `${name(d)}\n${format(d.value)}`);

        node.append("rect")
          // .attr("id", (d: any) => (d.leafUid = d3.select("leaf")).id)
          .attr("fill", (d: { children: any; }) => d === root ? "#fff" : d.children ? "#ccc" : "#ddd")
          .attr("stroke", "#fff");

        node.append("clipPath")
          // .attr("id", (d: any) => (d.clipUid = d3.select("clip")).id)
          .append("use")
          .attr("xlink:href", (d: { leafUid: { href: any; }; }) => d.leafUid.href);

        node.append("text")
          .attr("clip-path", (d: { clipUid: any; }) => d.clipUid)
          .attr("font-weight", (d: any) => d === root ? "bold" : null)
          .selectAll("tspan")
          .data((d: any) => (d === root ? name(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
          .join("tspan")
          .attr("x", 3)
          .attr("y", (d: any, i: any, nodes: any) => `${(i) === ((nodes.length - 1)) * 0.3 + 1.1 + i * 0.9}em`)
          .attr("fill-opacity", (d: any, i: any, nodes: any) => i === nodes.length - 1 ? 0.7 : null)
          .attr("font-weight", (d: any, i: any, nodes: any) => i === nodes.length - 1 ? "normal" : null)
          .text((d: any) => d);

        group.call(position, root);
      }

      function position(group: any, root: any) {
        group.selectAll("g")
          .attr("transform", (d: { x0: any; y0: any; }) => d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`)
          .select("rect")
          .attr("width", (d: { x1: any; x0: any; }) => d === root ? width : x(d.x1) - x(d.x0))
          .attr("height", (d: { y1: any; y0: any; }) => d === root ? 30 : y(d.y1) - y(d.y0));
      }

      // When zooming in, draw the new nodes on top, and fade them in.
      function zoomin(d: { x0: any; x1: any; y0: any; y1: any; parent: any; }) {
        const group0 = group.attr("pointer-events", "none");
        const group1 = group = svg.append("g").call(render, d);

        x.domain([d.x0, d.x1]);
        y.domain([d.y0, d.y1]);

        svg.transition()
          .duration(750)
          .call((t: any) => group0.transition(t).remove()
            .call(position, d.parent))
          .call((t: any) => group1.transition(t)
            .attrTween("opacity", () => d3.interpolate(0, 1))
            .call(position, d));
      }

      // When zooming out, draw the old nodes on top, and fade them out.
      function zoomout(d: { parent: { x0: any; x1: any; y0: any; y1: any; }; }) {
        const group0 = group.attr("pointer-events", "none");
        const group1 = group = svg.insert("g", "*").call(render, d.parent);

        x.domain([d.parent.x0, d.parent.x1]);
        y.domain([d.parent.y0, d.parent.y1]);

        svg.transition()
          .duration(750)
          .call((t: any) => group0.transition(t).remove()
            .attrTween("opacity", () => d3.interpolate(1, 0))
            .call(position, d))
          .call((t: any) => group1.transition(t)
            .call(position, d.parent));
      }

      return svg.node();
    })
  }
}
