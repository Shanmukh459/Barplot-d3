import { useState, useEffect } from "react";
import { scaleBand, scaleLinear, max, line } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = window.screen.width;
const height = 1020;

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 220,
};

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading..!</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.Population;
  const yValue = (d) => d.Country;

  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
}

export default App;
