import { Col, Row } from "react-bootstrap";
import CarFormInfo from "../../Components/CarFormInfo";

export const Zone = ({ zone }) => {
  return (
    <Col xs={12}>
      <Row>
        <Col xs={12}>
          <CarFormInfo zone={zone} />
        </Col>
      </Row>
    </Col>
  );
};
