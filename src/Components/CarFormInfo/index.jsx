import { useState } from "react";
import { Form, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import CarTracker from "../CarTracker";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Zone A', 'Zone B'],
  datasets: [
    {
      data: [30, 70],
      backgroundColor: [
        'rgb(0, 0, 0)',
        'rgb(255, 255, 255)',
      ],
      borderColor: [
        'rgb(0, 0, 0)',
        'rgb(255, 255, 255)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: { display: false },
  },
}

const CarFormInfo = ({ plant }) => {
  const [submittedvin, setSubmittedVin] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [vehicle, setVehicle] = useState({
    zone: plant,
    vin: "",
    chasis: "",
    operator: "",
    status: "todo",
    model: "",
    checklist: {
      interior: false,
      exterior: false,
      undervehicle: false,
      underhood: false,
      tries: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;

    const updatedChecklist = {
      ...vehicle.checklist,
      [name]: checked,
    };

    // Determine status
    const values = Object.values(updatedChecklist);
    let status = "todo";
    if (values.every(Boolean)) {
      status = "approved";
    } else if (values.some(Boolean)) {
      status = "inprogress";
    }

    setVehicle((prev) => ({
      ...prev,
      checklist: updatedChecklist,
      status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmittedVin(vehicle.vin);
    setVehicle({
      zone: plant,
      vin: "",
      chasis: "",
      operator: "",
      status: "todo",
      model: "",
      checklist: {
        interior: false,
        exterior: false,
        undervehicle: false,
        underhood: false,
        tries: false,
      },
    });

    ///NEED TO POST API CALL TO INSERT VIN TO MONGO DB....

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={4} xs={12}>
          <Row className="m-1 p-2">
            <h3>Add Vehicle Information</h3>
            <Form.Group as={Col} xs={3} controlId="zone" className="mb-3">
              <Form.Label>Zone</Form.Label>
              <Form.Control type="text" name="zone" value={plant} readOnly />
            </Form.Group>

            <Form.Group as={Col} xs={9} controlId="operator" className="mb-3">
              <Form.Label>Operator</Form.Label>
              <Form.Control
                type="text"
                name="operator"
                value={vehicle.operator}
                onChange={handleChange}
                maxLength={12}
                minLength={1}
                placeholder="Enter Operator Name (upto 12)"
                required
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} controlId="vin" className="mb-3">
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="text"
                name="vin"
                value={vehicle.vin}
                onChange={handleChange}
                placeholder="Enter 18 Vehicle Identification Number"
                maxLength={18}
                minLength={18}
                required
              />
            </Form.Group>

            <Form.Group as={Col} xs={6} controlId="chasis" className="mb-3">
              <Form.Label>Chasis</Form.Label>
              <Form.Control
                type="text"
                name="chasis"
                value={vehicle.chasis}
                onChange={handleChange}
                placeholder="Enter 10 chasis number"
                maxLength={10}
                minLength={10}
                required
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} controlId="model" className="mb-2">
              <Form.Label>Select Vehicle Model</Form.Label>
              <Form.Select
                name="model"
                value={vehicle.model}
                onChange={handleChange}
              >
                <option value="">Select Car Brand</option>
                <option value="nissan">Nissan GTR</option>
                <option value="renault">Renault KWID</option>
                <option value="toyota">Toyota G86</option>
                <option value="tesla">Tesla Model X</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Col>

        <Col lg={4} xs={12}>
          <Row className="m-1 p-2">
            <h3>Inspection Checklist</h3>
            {Object.entries(vehicle.checklist).map(([key, value]) => (
              <Form.Check
                key={key}
                type="checkbox"
                id={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                checked={value}
                onChange={handleChecklistChange}
                className="mb-2"
              />
            ))}
            <div className="mt-2 fw-bold">
              Status:{" "}
              <span
                className={
                  vehicle.status === "approved"
                    ? "text-success"
                    : vehicle.status === "inprogress"
                    ? "text-warning"
                    : "text-secondary"
                }
              >
                {vehicle.status}
              </span>
            </div>
            <Button
              type="submit"
              className="mt-3 w-50"
              variant="outline-primary"
            >
              Add Info
            </Button>
          </Row>
        </Col>

        {(submittedvin && submitted) ? (
          <Col
            lg={4}
            xs={12}
            className="justify-content-center align-items-center text-center mt-2"
          >
            <FaCheckCircle size={100} />
            <h4 className="mt-2">Vehicle Info Updated</h4>
          </Col>
        ) : (
          <Col xs={12} lg={4}>
            <Card className="bg-primary p-2" style={{minHeight: "30vh"}}>
              <h3>Data</h3>
              <Doughnut data={data} options={options} style={{maxHeight: "20vh"}}/>
            </Card>
          </Col>
        )}

        {loading && (
          <Col
            lg={4}
            xs={12}
            className="justify-content-center align-items-center text-center mt-2"
          >
            <Spinner animation="grow" variant="primary"/>
          </Col>
        )}
      </Row>

      <Row>
        <Col xs={12}>
          <CarTracker vin={submittedvin} />
        </Col>
      </Row>
    </Form>
  );
};

export default CarFormInfo;
