import { Col, Row } from "react-bootstrap";
import { StatusCard } from "../../Components/StatusCard";
import { Status } from "../../Components/Status";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const Landing = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URI);

    socket.on("data", (newData) => {
      setData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Col lg={6} className="vw-100 mb-2">
      <Row>
        <Col lg={9}>
          <Status data={data} />
        </Col>
        <Col lg={3} gap={2}>
          <StatusCard
            title="Temperature"
            dataValue={data.temperature}
            minValue={15}
            maxValue={35}
            unit="C"
            timestamp={data.timestamp}
          />
          <StatusCard
            title="Humidity"
            dataValue={data.humidity}
            minValue={0}
            maxValue={100}
            unit="%"
            timestamp={data.timestamp}
          />
          <StatusCard
            title="Pressure"
            dataValue={data.pressure}
            minValue={950}
            maxValue={1050}
            unit="hPa"
            timestamp={data.timestamp}
          />
        </Col>
      </Row>
    </Col>
  );
};
