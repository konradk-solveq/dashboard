import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';


const PieChart = (props) => {
    const {
        data,
        outerRadius,
        innerRadius,
    } = props;

    const margin = {
        top: 50, right: 50, bottom: 50, left: 50,
    };

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateCool)
        .domain(["banana", "cherry", "blueberry"])
        .range(["#eeff00", "#ff0022", "#2200ff"]);
        
    useEffect(() => {
        drawChart();
    }, [data]);


    function drawChart() {
        // Remove the old svg
        d3.select('#pie-container')
            .select('svg')
            .remove();

        // Create new svg
        const svg = d3
            .select('#pie-container')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const arcGenerator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d) => d.value);

        const arc = svg
            .selectAll()
            .data(pieGenerator(data))
            .enter();

        // Append arcs
        arc
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (d)=> d.data.color)
            .style('stroke', '#ffffff')
            .style('stroke-width', 0);

        // Append text labels
        arc
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.label[0])
            .style('fill', '#313131')
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            });
        arc
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.label[1])
            .style('fill', '#313131')
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y + 20})`;
            });
    }

    return <div id="pie-container" />;
}

export default PieChart;