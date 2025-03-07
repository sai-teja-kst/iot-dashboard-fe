import { useState, useEffect } from "react";

export const Status = ({ data }) => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    console.log(data);
    setTimestamp(data.timestamp);
  }, [data]);

  return (
    <div className="mt-3">
      <p>Device: IoT Device 1</p>
      <p>Status: Active</p>
      <p>Cloud: Azure Cloud</p>
      <p>Timestamp: {timestamp}</p>
    </div>
  );
};
