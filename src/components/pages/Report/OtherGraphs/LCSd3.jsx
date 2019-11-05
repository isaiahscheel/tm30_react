import React, { Component } from "react";
import { Element } from "react-faux-dom";
import * as d3 from "d3";
import data from "./data";

class LCSd3 extends Component {
  constructor(props) {
    super(props);
    var lcs = this.props.data;
    this.state = {
      data: [
        {
          huebin: 1,
          value: lcs[0] / 100
        },
        {
          huebin: 2,
          value: lcs[1] / 100
        },
        {
          huebin: 3,
          value: lcs[2] / 100
        },
        {
          huebin: 4,
          value: lcs[3] / 100
        },
        {
          huebin: 5,
          value: lcs[4] / 100
        },
        {
          huebin: 6,
          value: lcs[5] / 100
        },
        {
          huebin: 7,
          value: lcs[6] / 100
        },
        {
          huebin: 8,
          value: lcs[7] / 100
        },
        {
          huebin: 9,
          value: lcs[8] / 100
        },
        {
          huebin: 10,
          value: lcs[9] / 100
        },
        {
          huebin: 11,
          value: lcs[10] / 100
        },
        {
          huebin: 12,
          value: lcs[11] / 100
        },
        {
          huebin: 13,
          value: lcs[12] / 100
        },
        {
          huebin: 14,
          value: lcs[13] / 100
        },
        {
          huebin: 15,
          value: lcs[14] / 100
        },
        {
          huebin: 16,
          value: lcs[15] / 100
        }
      ]
    };

    //this.data = data;
  }

  plot(chart, width, height) {
    // create scales!
    var bar_colors = [
      "#b45c60",
      "#cb7761",
      "#cb824b",
      "#d7ad67",
      "#ac9a5d",
      "#919E60",
      "#678B5F",
      "#62B08F",
      "#7CBABA",
      "#2C797D",
      "#54778C",
      "#7189B1",
      "#988CA9",
      "#735876",
      "#8F6682",
      "#B97B8E"
    ];
    const xScale = d3
      .scaleBand()
      .domain(this.state.data.map(d => d.huebin))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(this.state.data, d => d.value),
        d3.max(this.state.data, d => d.value)
      ])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    chart
      .selectAll(".bar")
      .data(this.state.data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("x", d => xScale(d.huebin))
      .attr("y", d => yScale(d.value))
      .attr("height", d => height - yScale(d.value))
      .attr("width", d => xScale.bandwidth())
      .style("fill", (d, i) => bar_colors[i]);

    chart
      .selectAll(".bar-label")
      .data(this.state.data)
      .enter()
      .append("text")
      .classed("bar-label", true)
      .attr("x", d => xScale(d.huebin) + xScale.bandwidth() / 2)
      .attr("dx", 0)
      .attr("y", d => yScale(d.value))
      .attr("dy", -6)
      .text(d => Math.round(d.value * 100) + "%");

    const xAxis = d3.axisBottom().scale(xScale);

    chart
      .append("g")
      .classed("x axis", true)
      .attr("transform", `translate(0,${height / 2})`)
      .call(xAxis);

    //Here
    var formatPercent = d3.format(".0%");
    const yAxis = d3
      .axisLeft()
      .ticks(5)
      .scale(yScale)
      .tickFormat(formatPercent);

    chart
      .append("g")
      .classed("y axis", true)
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    chart
      .select(".x.axis")
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 30)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Hue-Angle Bin (j)");

    chart
      .select(".y.axis")
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("transform", `translate(-50, ${height / 2}) rotate(-90)`)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Local Chroma Shift (Rf,hj)");

    const yGridlines = d3
      .axisLeft()
      .scale(yScale)
      .tickSize(-width, 0, 0);

    chart
      .append("g")
      //.call(yGridlines)
      .classed("gridline", true);
  }

  drawChart() {
    const width = 800;
    const height = 450;

    const el = new Element("div");
    const svg = d3
      .select(el)
      .append("svg")
      .attr("id", "chart")
      .attr("width", width)
      .attr("height", height);

    const margin = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40
    };

    const chart = svg
      .append("g")
      .classed("display", true)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    this.plot(chart, chartWidth, chartHeight);

    return el.toReact();
  }

  render() {
    return this.drawChart();
  }
}

export default LCSd3;
