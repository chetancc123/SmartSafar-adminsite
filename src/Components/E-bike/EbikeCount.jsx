import React, { useState, useEffect } from "react";
import axios from "axios";


const Ebikecount = () => {
  const [maxSerialNumber, setMaxSerialNumber] = useState(0);

  const fetchAPIData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/get-two-wheelar/1"
      );
      // Calculate the maximum serial number
      const maxSerial = response.data.length;
      setMaxSerialNumber(maxSerial);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPIData();
  }, []);

  return (
    <div>
      
      <p style={{ fontSize: 30, fontWeight: "bold" }}> {maxSerialNumber}</p>
    </div>
  );
};

export default Ebikecount;
