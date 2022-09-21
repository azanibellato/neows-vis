import * as d3 from 'd3';

export function buildSideGraph(dataArray){
    const MAX_SIZE = 34;
    dataArray.reverse();

    d3.selectAll("#side-graph > *").remove();

    const margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 300 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#side-graph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var size = d3.scaleLinear()
        .domain(d3.extent(dataArray, d=>d.magnitude))
        .range([ 1,  MAX_SIZE]);

    
    svg.append('g')
        .selectAll("rect").data(dataArray).enter().append("rect")
        .attr("height", MAX_SIZE)
        .attr("width", MAX_SIZE)
        .attr("stroke", "white")
        .attr("fill", "transparent")
        .attr("x", 0 )
        .attr("y", (d, i)=> i*80)
        .attr("transform", (d, i)=>"rotate(45 0 "+(i*80)+")")

    svg.append('g')
        .selectAll("rect").data(dataArray).enter().append("rect")
        .attr("height", d => size(d.magnitude))
        .attr("width", d => size(d.magnitude))
        .attr("fill", "white")
        .attr("x", d => MAX_SIZE/2-size(d.magnitude)/2 )
        .attr("y", (d, i)=> i*80+MAX_SIZE/2-size(d.magnitude)/2)
        .attr("transform", (d, i)=>"rotate(45 0 "+(i*80)+")")
    

}