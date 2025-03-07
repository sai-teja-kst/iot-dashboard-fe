import { Col } from "react-bootstrap";
import { Temperature } from "../../Components/Temperature";
import { Status } from "../../Components/Status";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const Landing = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:5000");

        socket.on("data", (newData) => {
            setData(newData);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Col xs={6} className="vh-100 vw-100">
            <Status data={data} />
            <Temperature data={data} />
        </Col>
    );
};
