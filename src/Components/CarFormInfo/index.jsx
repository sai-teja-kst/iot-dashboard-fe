import { useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import CarTracker from "../CarTracker";

const CarFormInfo = ({ zone }) => {
  const [submittedvin, setSubmittedVin] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [vehicle, setVehicle] = useState({
    zone: zone,
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

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/v1/vehicle/car`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicle),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setSubmittedVin(vehicle.vin);
      setSubmitted(true);

      setVehicle({
        zone: zone,
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
    } catch (error) {
      console.error("Error submitting vehicle data:", error.message);
      alert(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={4} xs={12}>
            <Row className="p-2">
              <h3>Add Vehicle Information</h3>
              <Form.Group as={Col} xs={3} controlId="zone" className="mb-3">
                <Form.Label>Zone</Form.Label>
                <Form.Control type="text" name="zone" value={zone} readOnly />
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

          {submittedvin && submitted && (
            <Col
              lg={4}
              xs={12}
              className="justify-content-center align-items-center text-center mt-2"
            >
              <FaCheckCircle size={100} />
              <h4 className="mt-2">Vehicle Info Updated</h4>
            </Col>
          )}

          {loading && (
            <Col
              lg={4}
              xs={12}
              className="justify-content-center align-items-center text-center mt-2"
            >
              <Spinner animation="grow" variant="primary" />
            </Col>
          )}
        </Row>
      </Form>

      <Col xs={12}>
        <CarTracker vin={submittedvin} zone={zone}/>
      </Col>
    </>
  );
};

export default CarFormInfo;
