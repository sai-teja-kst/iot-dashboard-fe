import { useEffect, useState } from "react";
import { Col, Placeholder, Row } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const RealTimeCard = ({
  title,
  dataValue,
  minValue,
  maxValue,
  unit,
  timestamp,
}) => {
  const [value, setValue] = useState("--");

  useEffect(() => {
    if (dataValue !== undefined && dataValue !== null) {
      setValue(dataValue);
    } else {
      setValue("--");
    }
  }, [dataValue]);

  const current =
    value !== "--" && value >= minValue && value <= maxValue
      ? value - minValue
      : minValue;
  const remain = maxValue - (value !== "--" ? value : minValue);
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const isAboveThreshold = percentage > 75;

  const chartData = {
    labels: ["Current", "Remaining"],
    datasets: [
      {
        data: [current, remain],
        backgroundColor: [isAboveThreshold ? "red" : "green", "gray"],
        borderWidth: 0,
        rotation: 225,
        circumference: 270,
      },
    ],
  };

  const options = {
    cutout: "85%",
    plugins: {
      legend: { display: false },
    },
  };

  const timestamparr = timestamp && timestamp.split("T");

  return (
    <Col
      xs={12}
      className="border rounded shadow-lg text-center bg-transparent bg-gradient p-3 mt-2 bg-opacity-75"
      style={{ minHeight: "18rem" }}
    >
      <Row>
        <Col xs={12} lg={5}>
          {value !== "--" ? (
            <>
              <Doughnut data={chartData} options={options} />
              <h4>
                {value}
                {title === "Temperature" && <span>&deg;</span>} {unit}
              </h4>
            </>
          ) : (
            <>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <p>
                Please wait.. <br />
                <span>until server sends data..</span>
              </p>
            </>
          )}
        </Col>
        <Col
          xs={12}
          lg={7}
          className="justify-content-between align-items-between"
        >
          <h3>{title}</h3>
          <p>
            Min: {minValue}
            {title === "Temperature" && <span>&deg;</span>} {unit}
            <br />
            Max: {maxValue}
            {title === "Temperature" && <span>&deg;</span>} {unit}
          </p>

          {timestamp ? (
            <>
              <small>Date: {timestamparr[0]}</small>
              <br />
              <small>Time: {timestamparr[1].slice(0, 8)}</small>
            </>
          ) : (
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          )}
        </Col>
      </Row>
    </Col>
  );
};
