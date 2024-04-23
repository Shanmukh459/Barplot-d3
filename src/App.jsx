import { csv } from 'd3'
import { useState, useEffect } from 'react'
import { scaleBand, scaleLinear, max } from 'd3'

const csvUrl = "https://gist.githubusercontent.com/Shanmukh459/2aee3b1c120bb3cf829b756e98e46804/raw/fe3210df00d80c0fbbaa7b39f6b32a62ce1c9a1e/UN_Population_2100.csv"

const width = window.screen.width
const height = window.screen.height

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
  console.log(data[0])

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, height])

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, width])

  return (
    <svg width={width} height={height}>
      {data.map(d => <rect key={d.Country} x={0} y={yScale(d.Country)} width={xScale(d.Population)} height={yScale.bandwidth()} />)}
    </svg>
  )
}

export default App
