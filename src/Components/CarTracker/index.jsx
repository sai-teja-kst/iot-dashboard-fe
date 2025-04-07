import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";
import { GeneratePDF } from "../../Utils/GeneratePDF";
import "./index.css";
import { carData } from "../../Utils/CarInfo";
import {
  Speedometer2,
  GeoAlt,
  LightningCharge,
  CurrencyRupee,
  Calendar3,
  Gear,
} from "react-bootstrap-icons";
import { BigData } from "../BigData";

const CarTracker = ({vin}) => {

  useEffect(()=>{
    setUserVin(vin);
  },[vin])

  const [pdftemplate, setPDFTemplate] = useState("");
  const [userVin, setUserVin] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedCar = carData[pdftemplate];
  const iconMap = {
    model: <Gear className="me-2" />,
    year: <Calendar3 className="me-2" />,
    engine_capacity: <LightningCharge className="me-2" />,
    maximum_speed: <Speedometer2 className="me-2" />,
    maximum_power: <LightningCharge className="me-2" />,
    price_range: <CurrencyRupee className="me-2" />,
    region: <GeoAlt className="me-2" />,
  };

  const fetchvin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setVehicleData(null);

    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_BACKEND_URI}/api/v1/vehicle/get?vin=${vin}`
      );
      if (!response.ok) {
        throw new Error("VIN not found or invalid");
      }
      const data = await response.json();
      setVehicleData(data);
      setPDFTemplate(data.model);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Row className=" border rounded border-primary m-2">
        <Col xs={12} lg={2} className="bg-primary border rounded bg-gradient p-2">
          <Form onSubmit={fetchvin}>
            <h2>Filter Data</h2>
            <Form.Label size="sm">VIN</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              id="vin"
              minLength={18}
              maxLength={18}
              placeholder="Enter 18 Vehicle Identification Number"
              value={userVin}
              onChange={(e)=>(setUserVin(e.target.value))}
            />
            <Button type="submit" variant="dark" className="mt-2">Fetch VIN</Button>
          </Form>
          {loading && <p className="mt-4">Loading...</p>}
          {error && <p className="mt-4 text-danger">{error}</p>}
          {vehicleData && (
            <Button className="mt-2" onClick={() => GeneratePDF("pdf")}>
              Download PDF
            </Button>
          )}
        </Col>

        <Col xs={12} lg={9}>
          <BigData/>
        </Col>

        {pdftemplate && (
          <Col xs={12}>
            <Container
              id="pdf"
              className={`border border-secondary ${pdftemplate}`}
            >
              <Row>
                <Col xs={6}>
                  <div>
                    <p>Current Data</p>
                  </div>
                </Col>

                <Col xs={6}>
                  <Card className="car-card mb-2" style={{ maxWidth: "100%" }}>
                    <p>approval status</p>
                  </Card>

                  <Row className="g-3">
                    {Object.entries(selectedCar).map(([key, value]) => (
                      <Col xs={12} md={6} key={key}>
                        <Card className="p-3 car-card">
                          <div className="d-flex align-items-center mb-1 text-uppercase small fw-semibold">
                            {iconMap[key] || <Gear className="me-2" />}
                            {key.replace(/_/g, " ")}
                          </div>
                          <div className="fs-5 fw-medium">{value}</div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
  );
};

export default CarTracker;
