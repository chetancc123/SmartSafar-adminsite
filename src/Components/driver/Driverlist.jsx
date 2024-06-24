import React, { useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  Flex,
  Box,
  Icon,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

import Activedrivercount from "./Activedrivercount";
import { CSVLink } from "react-csv";


const Driverlist = ({ children }) => {
  const [carData, setCarData] = useState([]);
  const [activeDriverCount, setActiveDriverCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const extractRequiredColumns = () => {
    return carData.map((car, index) => ({
      "S.No": index + 1,
      Name: car.name,
      "Driver ID": car.driverId,
      Contact: car.phoneNo,
      "Email ID": car.email,
      Status: car.status,
    }));
  };

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      // Simulate loading time
      setTimeout(async () => {
        const response = await axios.get(
          "http://localhost:8080/hub/get-all-driver-list"
        );
        console.log("Data fetched:", response.data);
        setCarData(response.data);
        // Calculate active driver count
        const activeCount = response.data.filter(
          (car) => car.status === "ONGOING"
        ).length;
        console.log("Active driver count:", activeCount);
        setActiveDriverCount(activeCount);
        setIsLoading(false); // Set loading to false after data is fetched
      }, 1); // 2-second delay
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Ensure loading state is set to false even in case of error
    }
  };

  // Render loading state
  if (isLoading) {
    return 
  }

  return (
    <>
      <Flex direction="row" h="100vh" ml="100px" width="auto">
        <Flex direction="column" flex="1">
          <Flex direction={{ base: "column", md: "row" }}>
            <Box
              position="relative"
              w={{ base: "50%", md: "20%" }}
              h={{ base: "auto", md: "150px" }}
              p={4}
              bg="white"
              boxShadow="md"
              mb={{ base: 4, md: 0 }}
              mt={{ base: 10, md: 10 }}
              mr={{ base: 0, md: 14 }}
              borderRadius="10px"
              border="2px solid blue"
            >
              <Text position="absolute" top="5px" left="5px" fontWeight="bold">
                {" "}
                Active Driver
                <Text fontSize="30">
                  <Activedrivercount />
                </Text>
              </Text>
              <NavLink
                to="/Activedriver"
                style={{ position: "absolute", top: "5px", right: "5px" }}
              >
                <Icon as={FaBars} />
              </NavLink>
            </Box>
            <Box
              position="relative"
              w={{ base: "50%", md: "20%" }}
              h={{ base: "auto", md: "150px" }}
              p={4}
              bg="white"
              boxShadow="md"
              mb={{ base: 4, md: 0 }}
              mt={{ base: 10, md: 10 }}
              mr={{ base: 0, md: 14 }}
              borderRadius="2px"
              border="2px solid blue"
            >
              <Text position="absolute" top="5px" left="5px" fontWeight="bold">
                {" "}
                Total Driver<Text fontSize="30">{carData.length}</Text>
              </Text>
              <NavLink
                to={"/Totallist"}
                style={{ position: "absolute", top: "5px", right: "5px" }}
              >
                <Icon as={FaUser} />
              </NavLink>
            </Box>
            <Box
              position="relative"
              w={{ base: "50%", md: "25%" }}
              h={{ base: "auto", md: "150px" }}
              p={4}
              bg="white"
              boxShadow="md"
              mb={{ base: 4, md: 0 }}
              mt={{ base: 10, md: 10 }}
              mr={{ base: 0, md: 4 }}
              borderRadius="10px"
              border="2px solid blue"
            >
              <NavLink to="/TransportHome">
                <Text
                  position="absolute"
                  top="10px"
                  left="15px"
                  fontWeight="bold"
                >
                  Transport Driver
                  <Text marginLeft="60px"></Text>
                </Text>
              </NavLink>
            </Box>
          </Flex>
          <Box
            w={{ base: "100%", md: "95%" }}
            p={4}
            bg="gray.100"
            boxShadow="md"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: 10 }}
            overflowY="auto"
            border="2px solid blue"
          >
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Name</Th>
                  <Th>Driver ID</Th>
                  <Th>Contact</Th>
                  <Th>Email ID</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {carData.map((car, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{car.name}</Td>
                    <Td>{car.driverId}</Td>
                    <Td>{car.phoneNo}</Td>
                    <Td>{car.email}</Td>
                    <Td>
                      <Text
                        style={{
                          backgroundColor:
                            car.status === "online" ? "green" : "orange",
                          color: "white",
                          padding: "1px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        {car.status}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Box
              position="absolute"
              bottom="-210px"
              right="100px"
              textAlign="right" // Align the button to the right
            >
              <CSVLink
                data={extractRequiredColumns()} // Pass only required columns
                filename={"driver_data.csv"}
              >
                <Button colorScheme="teal">Download Excel</Button>
              </CSVLink>
            </Box>
          </Box>
          <Box flex="1">{children}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Driverlist;
