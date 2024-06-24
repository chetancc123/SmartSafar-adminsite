// TimeUpdate.jsx
import React, { useState, useEffect } from "react";
import { Text, Flex } from "@chakra-ui/react";
import Home from "./Home";

const TimeUpdate = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    
    <Flex justify="flex-end" p={4}>
      <Text fontSize="sm" color="gray.500">
        {currentDateTime}
      </Text>
    </Flex>
    </>
  );
};

export default TimeUpdate;
