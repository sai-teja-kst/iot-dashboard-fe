import { useEffect, useState} from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const Temperature = ({data}) => {

  const [temp, setTempValue] = useState(0);

  useEffect(()=>{
    console.log(data);
    setTempValue(data.temperature);
  },[data])

  ChartJS.register(ArcElement, Tooltip, Legend);

  const minTemp = 15;
  const maxTemp = 30;

  if (temp >= 15 && temp <= 30) {
    var current = temp - minTemp;
    var remain = maxTemp - temp;
  } else {
    current = 15;
    remain = 30;
  }

  const Tempdata = {
    labels: ["Current", "Remaining"],
    datasets: [
      {
        data: [current, remain],
        backgroundColor: ["skyblue", "grey"],
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

  return (
    <Row>
      <Col
        xs={4}
        style={{ width: "18rem", border: "solid 1px grey" }}
        className="rounded p-3 m-2 text-center"
      >
        <h3>Temperature</h3>
        <Doughnut data={Tempdata} options={options} />
        <h1 className="text-center">
          {temp}
          <span>&deg; C</span>
        </h1>
        <br />
        <p>
          Min: {minTemp}
          <span>&deg; C</span>
          <br />
          Max: {maxTemp}
          <span>&deg; C</span>
        </p>
      </Col>
      <Col
        xs={4}
        style={{ width: "18rem", border: "solid 1px grey" }}
        className="rounded p-3 m-2"
      >
        <Button variant="primary" onClick={() => setTempValue(temp + 1)}>
          Click
        </Button>
      </Col>
    </Row>
  );
};
