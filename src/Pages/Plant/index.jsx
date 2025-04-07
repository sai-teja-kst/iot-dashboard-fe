import { Col, Row } from "react-bootstrap";
import CarFormInfo from "../../Components/CarFormInfo";

export const Plant = ({ plant }) => {
  return (
    <Col xs={12}>
      <Row>
        <Col xs={12}>
          <CarFormInfo plant={plant} />
        </Col>
      </Row>
    </Col>
  );
};
