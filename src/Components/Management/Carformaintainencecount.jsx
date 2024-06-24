import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import axios from "axios";


const Carmaintancecount = ({ setCarCount }) => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hub/get-all/returncar/1/driverlist"
        );
        setCarData(response.data);
        setCarCount(response.data.length); // Update car count
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setCarCount]);

  return (
    <Box>
    
      <Text fontSize={40} fontWeight="bold">
        {carData.length}
      </Text>
    </Box>
  );
};

export default Carmaintancecount;
