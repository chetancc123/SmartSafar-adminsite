import { useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import axios from "axios";



const Ebikelist = ({ children }) => {
  const [carData, setCarData] = useState([]);
  const [assignCarCount, setAssignCarCount] = useState(0);
  const [engagedCarsCount, setEngagedCarsCount] = useState(0);
  const [returnCarCount, setReturnCarCount] = useState(0);

  const fetchAPIData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/get-two-wheelar/1"
      );
      const activeCount = response.data.filter(
        (car) => car.vehicleStatus === "AVAILABLE"
      ).length;
      setAssignCarCount(activeCount);

      const engagedCount = response.data.filter(
        (car) => car.vehicleStatus === "ENGAGED"
      ).length;
      setEngagedCarsCount(engagedCount);
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchReturnCarCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/get-total-number/returncar/1/driver"
      );
      setReturnCarCount(response.data);
    } catch (error) {
      console.error("Error fetching return car count:", error);
    }
  };

  useEffect(() => {
    fetchAPIData();
    fetchReturnCarCount();
  }, []);

  return (
   <>
   
   <Flex direction="row" h="100vh">
      <Flex direction="column" flex="1">
        <Flex
          direction={{ base: "column", md: "row" }}
          ml={{ base: "none", md: "90px" }}
        >
          {/* Boxes 1 to 4 */}
         

         
        </Flex>
        <Box
          w={{ base: "100%", md: "80%" }}
          p={4}
          bg="gray.100"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          overflowY="auto"
          border="3px solid black"
          ml={{ base: "none", md: "100px" }}
        >
          {/* Table header */}
          <Flex direction={{ base: "column", md: "row" }}>
            <Box flex="1">
              <Text as="strong">S.No</Text>
            </Box>
            <Box flex="2">
              <Text as="strong">Car Name</Text>
            </Box>
            <Box flex="2">
              <Text as="strong">Car Number</Text>
            </Box>
            <Box flex="2">
              <Text as="strong">Car Type</Text>
            </Box>
            <Box flex="2">
              <Text as="strong">Capacity</Text>
            </Box>
            <Box flex="2">
              <Text as="strong">Range</Text>
            </Box>
            <Box flex="2">
              <Text as="strong">Status</Text>
            </Box>
          </Flex>
          <Box borderBottom="1px solid #ccc" pb={2} mb={4}></Box>
          {/* Dynamically render data */}
          {carData &&
            carData.map((car, index) => (
              <Flex
                key={index}
                fontWeight="bold"
                direction={{ base: "column", md: "row" }}
                mt={2}
              >
                <Box flex={{ base: "100%", md: "1" }}>
                  <Text>{index + 1}</Text>
                </Box>
                <Box flex={{ base: "100%", md: "2" }}>
                  <Text>{car.vehicleName}</Text>
                </Box>
                <Box flex={{ base: "100%", md: "2" }}>
                  <Text>{car.vehicleNo}</Text>
                </Box>
                <Box flex={{ base: "100%", md: "2" }}>
                  <Text>{car.vehicleType}</Text>
                </Box>
                <Box flex={{ base: "100%", md: "2" }}>
                  <Text>{car.seatingCapacity}</Text>
                </Box>
                <Box flex={{ base: "100%", md: "2" }}>
                  <Text>{car.range} 3</Text>
                </Box>
                <Box flex={{ base: "100%", md: "2" }}>
                 
                    <Text
                      style={{
                        backgroundColor:
                          car.vehicleStatus === "Available"
                            ? "green"
                            : "orange",
                        color: "white",
                        padding: "5px 35px",
                        borderRadius: "5px",
                      }}
                    >
                      {car.vehicleStatus}
                    </Text>
                </Box>
              </Flex>
            ))}
        </Box>
        <Box flex="1">{children}</Box>
      </Flex>
    </Flex>
   </>
  );
};

export default Ebikelist;
