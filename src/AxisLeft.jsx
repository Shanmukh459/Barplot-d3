export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
    <g key={tickValue}>
      <text
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        x={-3}
        dy="0.32em"
        style={{ textAnchor: "end" }}
      >
        {tickValue}
      </text>
    </g>
  ));
