import * as d3 from 'd3';

export function buildMainGraph(data){
    //Remove previous graphs
    d3.selectAll("#main-graph > *").remove();

    // Functions to extract relevant info from data array
    let get_velocity = (item => item.velocity);
    let get_distance = (item => item.distance);
    let get_diameter = (item => item.diameter);

    // Set the dimensions and margins of the graph
    const margin = {top: 10, right: 20, bottom: 30, left: 0},
        width = 900 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;

    // append the svg object to the HTML element
    var svg = d3.select("#main-graph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


            var defs = svg.append("defs");

    //Create a radial gradient for the circle filling
    defs.append("radialGradient")
        .attr("id", "circle-gradient")
        .attr("cx", "50%")	
        .attr("cy", "50%")
        .attr("r", "50%")
        .selectAll("stop")
        .data([
                {offset: "0%", color: "rgba(42, 245, 152, 0)"},
                {offset: "100%", color: "rgba(42, 245, 152, 0.2)"}
            ])
        .enter().append("stop")
        .attr("offset", d => d.offset )
        .attr("stop-color", d => d.color );

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, get_velocity))
        .range([ 50, width-50 ]);
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x))
    //     .select(".domain").remove();

    // Add Y axis
    var y = d3.scaleLinear()
        .domain(d3.extent(data, get_distance))
        .range([ height-50, 50]);
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(-width).ticks(4)) //.tickFormat(""))
        .call(g => g.selectAll(".tick line").attr("stroke-opacity", 0.5)) 
        .call(g => g.selectAll(".domain").attr("stroke-opacity", 0.5))
        .select(".domain").remove()

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain(d3.extent(data, get_diameter))
        .range([ 1, 50]);

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d =>  x(get_velocity(d)) )
        .attr("cy", d =>  y(get_distance(d)) )
        .attr("r", 1)
        .style("fill", "#2AF598");

    // Add circles
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "datacircle")
        .attr("cx", d =>  x(get_velocity(d)) )
        .attr("cy", d =>  y(get_distance(d)) )
        .attr("r", d => z(get_diameter(d)) )
        .style("fill", "url(#circle-gradient)")
        .attr("stroke", "#2AF598");

    // create a tooltip
    const tooltip = d3.select("#main-graph").append("div")
        .attr("class","data-tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("pointer-events", "none")
        .html("<p></p>");

    d3.selectAll(".datacircle")
        .on("mouseover", (event) => {
            let circledata = event.target.__data__;
            tooltip.html(
                `<p>Name: ${circledata.name}</p>
                <p>Diameter: ${circledata.diameter} km</p>
                <p>Magnitude: ${circledata.magnitude} h</p>
                <p>Distance: ${circledata.distance} au</p>
                <p>Velocity: ${circledata.velocity} km/s</p>`
            )
            .style("visibility", "visible")
        }

            )
        .on("mousemove", (event) => { 
            
            tooltip.style("top", (event.offsetY)+"px").style("left",(event.offsetX)+"px")
            
        })
        .on("mouseout", (event) =>  tooltip.style("visibility", "hidden"));


  }