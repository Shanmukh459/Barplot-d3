import { csv } from 'd3'
import { useState, useEffect } from 'react'
import { scaleBand, scaleLinear, max, line } from 'd3'

const csvUrl = "https://gist.githubusercontent.com/Shanmukh459/2aee3b1c120bb3cf829b756e98e46804/raw/fe3210df00d80c0fbbaa7b39f6b32a62ce1c9a1e/UN_Population_2100.csv"

const width = window.screen.width
const height = 1020

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

function App() {

  const [data, setData] = useState(null)
  useEffect(() => {
    const row = d => {
      d.Population = +d[2100]
      return d
    }
    csv(csvUrl, row).then(data => {
      setData(data.slice(0, 10))
    })

  }, [])

  if(!data) {
    return <pre>Loading..!</pre>
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight])

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, innerWidth])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map(tickValue => (
          <g transform={`translate(${xScale(tickValue)},0)`}>
            <line 
              y2={innerHeight} 
              stroke="black"
            />
            <text 
              y={innerHeight+3}
              style={{textAnchor:'middle'}}
              dy='0.71em'
            >{tickValue}</text>
          </g>
        ))}
        {data.map(d => (
          <rect 
            key={d.Country} 
            x={0} 
            y={yScale(d.Country)} 
            width={xScale(d.Population)} 
            height={yScale.bandwidth()} 
          />
        ))}

      </g>
    </svg>
  )
}

export default App
