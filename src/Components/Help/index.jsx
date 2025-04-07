import { useState } from "react";
import {Button, Modal} from "react-bootstrap";
import { Question } from "react-bootstrap-icons";
import { FaCopy } from "react-icons/fa";

export const Hello = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCopyQuery = (e) => {
    navigator.clipboard.writeText(e)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Help <Question size={20}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions to Use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>AI Model: Gemini 2.0-flash</li>
            <li>Purpose: To Gather data from database based on user query</li>
            <li>Note: This AI model designed to retrieve the data. NOT TO DELETE, DROP, INSERT OR UPDATE in database</li>
            <li>Sample Questions
              <ul>
                <li>Provide me latest 3 records from database.<Button className="m-2" size="sm" onClick={()=>onCopyQuery("Provide me latest 3 records from database.")}><FaCopy/></Button></li>
                <li>what was lastest timestamp of temperature which is greater than 17<Button className="m-2" size="sm" onClick={()=>onCopyQuery("what was lastest timestamp of temperature which is greater than 17")}><FaCopy/></Button></li>
                <li>what was lastest timestamp of humidity which is less than 50<Button className="m-2" size="sm" onClick={()=>onCopyQuery("what was lastest timestamp of humidity which is less than 50")}><FaCopy/></Button></li>
              </ul>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
