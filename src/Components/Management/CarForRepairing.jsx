import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Box, Th, Td } from "@chakra-ui/react";
import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";


const CarForRepairing = ({ children, setCarCount }) => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/CarRepairsList"
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
    <>
  
    <Flex direction="row" h="100vh" mt={10}>
      <Flex direction="column" flex="1">
        <Box
          position="relative"
          w={{ base: "50%", md: "20%" }}
          h={{ base: "25px", md: "10px" }}
          p={4}
          bg="white"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: "-33px" }}
          mr={{ base: 0, md: 1 }}
        >
          <Text position="absolute" top="5px" left="50px" fontWeight="bold">
            {/* Management Page */}
          </Text>
          {/* <Icon as={IoChevronBack} position="absolute" top="8px" left="5px" /> */}
        </Box>

        <Box
          w="1000px"
          bg="white"
          borderRadius="10px"
          border="1px solid black"
          borderColor="blue.200"
          // mb={"-10px"}
          marginLeft={{ base: "none", md: "-1px" }}
          overflowY="auto"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={{ background: "#355eef", color: "black" }}>S.No </Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Car Name
                </Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Car Number
                </Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Return time
                </Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Message
                </Th>
                <Th style={{ background: "#355eef", color: "black " }}>
                  Send to Repair
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {carData.map((car, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{car.vehicleName}</Td>
                  <Td>{car.vehicleNo}</Td>
                  <Td>{car.returnTime}</Td>

                  <Td>{car.message}</Td>
                  <Td>
                    <Link
                     to={`/RequestforRepair/${car.carRepairId}`}
                    >
                      <Button colorScheme="blue">Send</Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box flex="1">{children}</Box>
      </Flex>
    </Flex>
    </>
  );
};

export default CarForRepairing;
