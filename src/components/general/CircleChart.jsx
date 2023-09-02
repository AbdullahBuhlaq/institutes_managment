function CircleChart(props) {
  return (
    <div className="chart-svg">
      <svg viewBox="0 0 36 36" className={"circular-chart " + props.color}>
        <path
          className="circle-bg"
          style={{ strokeWidth: "1px" }}
          d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
        ></path>
        <path
          className="circle"
          style={{ strokeWidth: "2.3px" }}
          strokeDasharray={props.percentage + ", 100"}
          d="M18 2.0845
    a 15.9155 15.9155 0 0 1 0 31.831
    a 15.9155 15.9155 0 0 1 0 -31.831"
        ></path>
        <text x="18" y="20.35" className="percentage">
          {props.percentage}%
        </text>
      </svg>
    </div>
  );
}

export default CircleChart;
