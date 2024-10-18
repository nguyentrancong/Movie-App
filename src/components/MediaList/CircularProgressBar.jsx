const CircularProgressBar = ({
  percent = 0.0,
  size = 3,
  strokeWidth = 0.25,
  strokeColor = "green",
}) => {
  const radius = size / 2 - strokeWidth;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = strokeDasharray - (percent / 100) * strokeDasharray;

  return (
    <div>
      <svg width={`${size}vw`} height={`${size}vw`}>
        <circle
          r={`${radius}vw`}
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          stroke="white"
          strokeWidth={`${strokeWidth}vw`}
        />
        <circle
          r={`${radius}vw`}
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          stroke={strokeColor}
          strokeWidth={`${strokeWidth}vw`}
          strokeDasharray={`${strokeDasharray}vw`}
          strokeDashoffset={`${strokeDashoffset}vw`}
          transform="rotate(-90)"
          style={{ transformOrigin: "center" }}
          strokeLinecap="round"
          fill="none"
        />
        <text
          x={`${size / 2}vw`}
          y={`${size / 2}vw`}
          fill="white"
          alignmentBaseline="middle"
          textAnchor="middle"
          fontSize={`1.2vw`}
        >
          {percent}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
