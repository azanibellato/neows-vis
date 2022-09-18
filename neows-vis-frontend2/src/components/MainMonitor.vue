<script setup>
    import * as d3 from 'd3';
    import { onMounted } from 'vue';
    const props = defineProps(['data']);
    

    onMounted(() => {
        console.log(props.data);

        let get_velocity = (item => item.close_approach_data[0].relative_velocity.kilometers_per_second);
        let get_distance = (item => item.close_approach_data[0].miss_distance.astronomical);
        let get_diameter = (item => item.estimated_diameter.kilometers.estimated_diameter_min); //TODO: change into average diameter
    
        // Set the dimensions and margins of the graph
        const margin = {top: 100, right: 20, bottom: 30, left: 0},
            width = 900 - margin.left - margin.right,
            height = 420 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#main-graph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        // Add X axis
        var x = d3.scaleLog()
            .domain(d3.extent(props.data, get_velocity))
            .range([ 100, width/2+100 ]);
        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x))
        //     .select(".domain").remove();

        // Add Y axis
        var y = d3.scaleLinear()
            .domain(d3.extent(props.data, get_distance))
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(-width).ticks(4).tickFormat(""))
            .call(g => g.selectAll(".tick line").attr("stroke-opacity", 0.5)) 
            .call(g => g.selectAll(".domain").attr("stroke-opacity", 0.5))
            // .select(".domain").remove()

        // Add a scale for bubble size
        var z = d3.scaleLinear()
            .domain(d3.extent(props.data, get_diameter))
            .range([ 1, 50]);

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("cx", d =>  x(get_velocity(d)) )
            .attr("cy", d =>  y(get_distance(d)) )
            .attr("r", 1)
            .style("fill", "#2AF598");

        // Add circles
        svg.append('g')
            .selectAll("dot")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("cx", d =>  x(get_velocity(d)) )
            .attr("cy", d =>  y(get_distance(d)) )
            .attr("r", d => z(get_diameter(d)) )
            .style("fill", "#2AF598")
            .style("opacity", "0.5")
            .attr("stroke", "#2AF598");


});
</script>

<template>
    <div id="main-monitor">
        <h2>Asteroids of the day</h2>
        <div id="day-menu">
            <p>Select one day to update the chart:</p>
            <div class="btn-menu">
                <button class="day-btn selected">mon</button>
                <button class="day-btn">tue</button>
                <button class="day-btn">wed</button>
                <button class="day-btn">thu</button>
                <button class="day-btn">fri</button>
                <button class="day-btn">sat</button>
                <button class="day-btn">sun</button>
            </div>
        </div>
        
        <div id="main-graph">
            
        </div>
        <div id="main-graph-legend">
            <label><span class="icon">&uparrow;</span> DISTANCE (au)</label>
            <label><span class="icon">&rightarrow;</span> VELOCITY (km/s)</label>
        </div>
    </div>
</template>

