import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Container, Spinner, Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { CarPDFGenerator } from "../CarPDFGenerator";

const COLUMN_WIDTHS = ["5%", "20%", "20%", "20%", "10%", "15%", "10%"];

const CarZoneData = ({ zone, filteredVehicle, pdftemplate }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filteredVehicle) {
      setVehicles([filteredVehicle]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URI}/api/v1/vehicle/car?zone=${zone}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vehicle data:", err);
        setLoading(false);
      });
  }, [zone, filteredVehicle]);

  const Row = ({ index, style }) => {
    const vehicle = vehicles[index];
    return (
      <div
        className="d-flex align-items-center text-center border-bottom"
        style={{ ...style, height: "50px" }}
      >
        <div style={{ width: COLUMN_WIDTHS[0] }}>{index + 1}</div>
        <div style={{ width: COLUMN_WIDTHS[1] }}>{vehicle.vin}</div>
        <div style={{ width: COLUMN_WIDTHS[2] }}>{vehicle.chasis}</div>
        <div style={{ width: COLUMN_WIDTHS[3] }}>{vehicle.operator}</div>
        <div style={{ width: COLUMN_WIDTHS[4] }}>{vehicle.model}</div>
        <div style={{ width: COLUMN_WIDTHS[5] }}>{vehicle.status}</div>
        <div style={{ width: COLUMN_WIDTHS[6] }}>
          <Button variant="dark" size="sm">
            <FaDownload size={10} />
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading vehicle data...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4">
      <h4 className="mb-3">Car Zone Data</h4>
      <div className="border rounded mb-2" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <div
          className="d-flex align-items-center text-center border-bottom bg-dark text-white"
          style={{ height: "50px" }}
        >
          <div style={{ width: COLUMN_WIDTHS[0] }}>S.No.</div>
          <div style={{ width: COLUMN_WIDTHS[1] }}>VIN</div>
          <div style={{ width: COLUMN_WIDTHS[2] }}>Chasis</div>
          <div style={{ width: COLUMN_WIDTHS[3] }}>Operator</div>
          <div style={{ width: COLUMN_WIDTHS[4] }}>Model</div>
          <div style={{ width: COLUMN_WIDTHS[5] }}>Status</div>
          <div style={{ width: COLUMN_WIDTHS[6] }}>Download</div>
        </div>
        <List height={430} itemCount={vehicles.length} itemSize={43} width="100%">
          {Row}
        </List>
      </div>


    <CarPDFGenerator pdftemplate={pdftemplate} vehicledata={filteredVehicle}/>

    </Container>
  );
};

export default CarZoneData;
