import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { RealTimeCard } from "../../Components/RealTimeCard";
import { Parameter } from "../../Components/Parameter";

export const Landing = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("latestData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const fetchLatestData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/v1/west/lastest`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const latestData = await response.json();
      setData(latestData);
      localStorage.setItem("latestData", JSON.stringify(latestData));
    } catch (error) {
      console.error("Error fetching latest data:", error);
    }
  };

  useEffect(() => {
    fetchLatestData();

    const socket = io(process.env.REACT_APP_BACKEND_URI);

    socket.on("data", (newData) => {
      setData(newData);
      localStorage.setItem("latestData", JSON.stringify(newData));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Col className="mb-2">
      <Row>
        <Col lg={9}>
          <Parameter timestamp={data.timestamp}/>
        </Col>
        <Col lg={3} gap={2}>
          <RealTimeCard
            title="Temperature"
            dataValue={data.temperature}
            minValue={15}
            maxValue={35}
            unit="C"
            timestamp={data.timestamp}
          />
          <RealTimeCard
            title="Humidity"
            dataValue={data.humidity}
            minValue={0}
            maxValue={100}
            unit="%"
            timestamp={data.timestamp}
          />
          <RealTimeCard
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
