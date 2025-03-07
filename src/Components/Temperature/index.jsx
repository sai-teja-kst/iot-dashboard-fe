import { Card, CardBody, CardTitle } from "react-bootstrap"
import { FaTemperatureHigh } from "react-icons/fa";

export const Temperature = () => {
    return(
        <Card className="p-2">
            <CardTitle>Temperature Graph <FaTemperatureHigh size={24}/>
            </CardTitle>
            <CardBody>
                
            </CardBody>
        </Card>
    )
}

