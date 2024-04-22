import { csv } from 'd3'
import { useState, useEffect } from 'react'

const csvUrl = "https://gist.githubusercontent.com/Shanmukh459/2aee3b1c120bb3cf829b756e98e46804/raw/fd2320218c8bdd43220285524528161ce1e938e1/UN_Population_2019.csv"

function App() {

  const [data, setData] = useState(null)
  useEffect(() => {
    csv(csvUrl).then(data => setData(data))

  }, [])

  console.log(data)

  return (
    <h1>Hello</h1>
  )
}

export default App
