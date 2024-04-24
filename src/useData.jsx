import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/Shanmukh459/2aee3b1c120bb3cf829b756e98e46804/raw/fe3210df00d80c0fbbaa7b39f6b32a62ce1c9a1e/UN_Population_2100.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = (d) => {
      d.Population = +d[2100] * 1000;
      return d;
    };
    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);
  return data;
};
