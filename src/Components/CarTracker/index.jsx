import React, { useEffect, useState, Suspense, lazy } from "react";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import "./index.css";

const CarZoneData = lazy(() => import("../CarZoneData"));

const CarTracker = ({ vin, zone }) => {
  const [userVin, setUserVin] = useState("");
  const [pdftemplate, setPDFTemplate] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (vin) setUserVin(vin);
  }, [vin]);

  const fetchvin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setVehicleData(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/v1/vehicle/car?zone=${zone}&vin=${userVin}`
      );
      if (!response.ok) {
        throw new Error("VIN not found or invalid");
      }
      const data = await response.json();
      setVehicleData(data);
      setPDFTemplate(data.model || "");
    } catch (err) {
      setError(err.message || "Error fetching vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="border rounded m-1 bg-primary text-light">
      <Col xs={12} lg={2} className="p-2">
        <Form onSubmit={fetchvin}>
          <h2>Filter Data</h2>
          <Form.Label size="sm">VIN</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            id="vin"
            minLength={18}
            maxLength={18}
            placeholder="Enter 18-character VIN"
            value={userVin}
            onChange={(e) => setUserVin(e.target.value)}
          />
          <Button
            type="submit"
            variant="dark"
            className="mt-2"
            disabled={userVin.length !== 18}
          >
            Fetch VIN
          </Button>
        </Form>

        {loading && <Spinner animation="border" className="mt-3" />}
        {error && <p className="mt-3 text-danger">{error}</p>}
      </Col>

      <Col xs={12} lg={10}>
        <Suspense fallback={<div>Loading CarZoneData...</div>}>
          <CarZoneData zone={zone} pdftemplate={pdftemplate} filteredVehicle={vehicleData} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default CarTracker;
