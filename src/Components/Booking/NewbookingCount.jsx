import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import axios from "axios";


const NewBookingcount = () => {
  const [driverCount, setDriverCount] = useState(0);

  useEffect(() => {
    fetchData(); // Fetch data from API when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/all-hub-list"
      );
      setDriverCount(response.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box>
   
      <Text fontSize={40} fontWeight="bold">
        {driverCount}
      </Text>
    </Box>
  );
};

export default NewBookingcount;
