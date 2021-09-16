import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const BarChart: React.FC<{ data: any, page: any }> = ({
    data, page
}) => {

    const margin = {
        top: 50, right: 50, bottom: 50, left: 50,
    };
    const width = 1100 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    useEffect(() => {
        const da = [];
        for (let key in data) {
            const item = { num:0};
            const s = key.split('_');
            item.num = Number(s[0] + s[1] + s[2]);
            item[key] = data[key];
            da.push(item)
        }
        // console.log('%c da:', 'background: #ffcc00; color: #003300', da)
        drawChart(da.sort((a, b) => a.num - b.num));
    }, [data, page]);


    function drawChart(data) {
        // console.log('%c da--ta:', 'background: #ffcc00; color: #003300', data)
        // 

        // Remove the old svg
        d3.select('#bar-container')
            .select('svg')
            .remove();

        // Create new svg
        const svg = d3
            .select('#bar-container')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

        // Parse the Data

        // X axis
        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(function (d) {
                // console.log('%c d:', 'background: #ffcc00; color: #003300', Object.keys(d)[0])
                return Object.keys(d)[1];
            }))
            .padding(0.2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        let maxVal = d3.max(data.map(e => {
            // console.log('%c Object.values(e):', 'background: #ffcc00; color: #003300', Object.values(e));
            return Object.values(e)[1]
        }));

        // console.log('%c maxVal:', 'background: #ffcc00; color: #003300', maxVal)

        const y = d3.scaleLinear()
            .domain([0, maxVal])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => {
                // console.log('%c d:', 'background: #ffcc00; color: #003300', Object.keys(d)[0])
                return x(Object.keys(d)[1]);
            })
            .attr("y", (d) => {
                // console.log('%c e:', 'background: #ffcc00; color: #003300', Object.values(d)[0])
                return y(Object.values(d)[1]);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(Object.values(d)[1]); })
            .attr("fill", "#69b3a2")
    }

    return <div id="bar-container" />;
}

export default BarChart;