import { useState, useEffect } from "react";
import {
  Col,
  DropdownButton,
  DropdownItem,
  Form,
  InputGroup,
  Row,
  Container,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const ParameterGraph = () => {
  const [parameter, setParameter] = useState("temperature");
  const [duration, setDuration] = useState(10);
  const [unit, setUnit] = useState("mins");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const maxDuration = unit === "mins" ? 60 : 24;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/api/v1/west/timestamp?parameter=${parameter}&duration=${duration}&unit=${unit}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parameter, duration, unit]);

  const chartData = {
    labels: Array.isArray(data) ? data.map((entry) => entry.timestamp) : [],
    datasets: [
      {
        label: `${parameter} over time`,
        data: Array.isArray(data)
          ? data.map((entry) => parseFloat(entry[parameter]))
          : [],
        borderColor: "rgb(113, 197, 236)",
        backgroundColor: "rgba(75,192,192,0.2)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Timestamp" } },
      y: { title: { display: true, text: parameter } },
    },
  };

  return (
    <Container className="p-3">
      <h1 className="text-center">Graph</h1>
      <Row className="align-items-center justify-content-between">
        <Col xs="auto">
          <DropdownButton title={`Parameter: ${parameter}`} size="sm" variant="outline-primary">
            <DropdownItem onClick={() => setParameter("temperature")}>
              Temperature
            </DropdownItem>
            <DropdownItem onClick={() => setParameter("pressure")}>
              Pressure
            </DropdownItem>
            <DropdownItem onClick={() => setParameter("humidity")}>
              Humidity
            </DropdownItem>
            <DropdownItem onClick={() => setParameter("co2Gas")}>
              CO2 Gas
            </DropdownItem>
          </DropdownButton>
        </Col>

        <Col xs="auto mt-2" className="d-flex gap-2">
          <InputGroup size="sm" className="w-auto">
            <InputGroup.Text id="duration">Duration:</InputGroup.Text>
            <Form.Control
              type="number"
              min="1"
              max={maxDuration}
              value={duration}
              onChange={(e) => {
                const value = Math.min(
                  Math.max(0, Number(e.target.value)),
                  maxDuration
                );
                setDuration(value);
              }}
            />
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title={unit}
              id="unit-dropdown"
            >
              <DropdownItem onClick={() => setUnit("mins")}>Mins</DropdownItem>
              <DropdownItem onClick={() => setUnit("hrs")}>Hrs</DropdownItem>
            </DropdownButton>
          </InputGroup>
        </Col>
      </Row>

      <div className="mt-2">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {data && <Line data={chartData} options={chartOptions} />}
      </div>
    </Container>
  );
};
