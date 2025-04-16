import { Col, Container, Row, Table, Card } from "react-bootstrap";
import { carData } from "../../Utils/CarInfo";
import {
  Speedometer2,
  GeoAlt,
  LightningCharge,
  CurrencyRupee,
  Calendar3,
  Gear,
} from "react-bootstrap-icons";

export const CarPDFGenerator = ({ pdftemplate, vehicledata }) => {
  console.log(vehicledata);

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

  return (
    <>
      {pdftemplate && (
        <Col xs={12}>
          <Container
            id="pdf"
            className={`border border-secondary d-none ${pdftemplate}`}
          >
            <Row>
              <Col xs={12} md={6}>
                {vehicledata && (
                  <Card className="p-3 car-card mb-3">
                    <h6 className="fw-bold mb-3">Vehicle Inspection Information</h6>

                    <div className="mb-3">
                      {vehicledata.status === "done" && (
                        <h5 className="text-success fw-bold">
                          ✅ Approved
                        </h5>
                      )}
                      {vehicledata.status === "inprogress" && (
                        <h5 className="text-warning fw-bold">
                          ⏳ In Progress
                        </h5>
                      )}
                      {vehicledata.status !== "done" &&
                        vehicledata.status !== "inprogress" && (
                          <h5 className="text-secondary fw-bold">
                            🕒 To Do
                          </h5>
                        )}
                    </div>

                    <Table bordered size="sm" className="mb-3">
                      <tbody>
                        <tr>
                          <th>VIN</th>
                          <td>{vehicledata.vin}</td>
                        </tr>
                        <tr>
                          <th>Operator</th>
                          <td>{vehicledata.operator}</td>
                        </tr>
                        <tr>
                          <th>Chasis</th>
                          <td>{vehicledata.chasis}</td>
                        </tr>
                        <tr>
                          <th>Zone</th>
                          <td>{vehicledata.zone}</td>
                        </tr>
                      </tbody>
                    </Table>
                    {vehicledata.checklist && (
                      <>
                        <h6 className="fw-bold mt-3">Checklist</h6>
                        <div className="d-flex flex-column gap-2 ps-1">
                          {Object.entries(vehicledata.checklist).map(
                            ([section, result]) => {
                              const isChecked = result === true;
                              const isDisabled = false; // update this logic if you support disabled state

                              return (
                                <div
                                  key={section}
                                  className={`form-check d-flex align-items-center ${
                                    isDisabled ? "opacity-50" : ""
                                  }`}
                                >
                                  <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    readOnly
                                    style={{
                                      borderColor: isChecked ? "#000" : "#ccc",
                                      backgroundColor: isChecked
                                        ? "#000"
                                        : "#fff",
                                    }}
                                  />
                                  <label className="form-check-label text-capitalize">
                                    {section.replace(/_/g, " ")}
                                  </label>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </>
                    )}
                  </Card>
                )}
              </Col>

              <Col xs={6}>
                <h3>Car Specification</h3>
                <Row className="g-3">
                  {Object.entries(selectedCar).map(([key, value]) => (
                    <Col xs={12} md={6} key={key}>
                      <Card className="p-3 car-card">
                        <div className="d-flex align-items-center mb-1 text-uppercase small fw-semibold">
                          {iconMap[key] || <Gear className="me-2" />}
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="fs-5 fw-medium">
                          {typeof value === "object" && value !== null ? (
                            <ul className="mb-0 ps-3">
                              {Object.entries(value).map(
                                ([subKey, subValue]) => (
                                  <li key={subKey} className="text-capitalize">
                                    <strong>
                                      {subKey.replace(/_/g, " ")}:
                                    </strong>{" "}
                                    {String(subValue)}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            String(value)
                          )}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
      )}
    </>
  );
};
