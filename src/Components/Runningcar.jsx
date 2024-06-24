import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";


const Runningcar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [carData, setCarData] = useState([]);

  const demoData = [
    {
      carName: "Toyota Corolla",
      carNumber: "ABC123",
      carType: "Sedan",
      Location: "Raipur",
      range: "500 km",
      driverName: "John Doe",
    },
    {
      carName: "Honda Civic",
      carNumber: "XYZ456",
      carType: "Sedan",
      Location: "Raipur",
      range: "450 km",
      driverName: "Jane Smith",
    },
    {
        carName: "Toyota Corolla",
        carNumber: "ABC123",
        carType: "Sedan",
        Location: "Raipur",
        range: "500 km",
        driverName: "John Doe",
      },
  ];

  useEffect(() => {
    setCarData(demoData);
  }, []);

  return (
 <>
 
 <Flex direction="row" h="100vh">
      <Flex direction="column" flex="1">
        <Box
          position="relative"
          w={{ base: "50%", md: "20%" }}
          h={{ base: "25px", md: "10px" }}
          p={4}
          bg="white"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: "10px" }}
          mr={{ base: 0, md: 10 }}
        >
          <Text
            position="absolute"
            top="5px"
            ml={{ base: "none", md: "100px" }}
            fontWeight="bold"
          >
            Running car
          </Text>
          <NavLink to={"/Carlist"}>
            <Icon
              as={IoChevronBack}
              position="absolute"
              top="8px"
              ml={{ base: "none", md: "80px" }}
            />
          </NavLink>
        </Box>
        <Box
          w="1000px"
          overflowY="auto"
          bg="white"
          borderRadius="10px"
          border="1px solid black"
          borderColor="blue.200"
          marginTop="10px"
          ml={{ base: "none", md: "40px" }}
        >
          {/* Table */}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={{ background: "#355eef", color: "black" }}>S No.</Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Car Name
                </Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Car Number
                </Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Car Type
                </Th>
                <Th style={{ background: "#355eef", color: "black" }}>
                  Location
                </Th>
                <Th style={{ background: "#355eef", color: "black" }}>Range</Th>
                <Th style={{ background: "#355eef", color: "black " }}>
                  Driver Name
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {carData.map((car, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td fontWeight="bold">{car.carName}</Td>
                  <Td fontWeight="bold">{car.carNumber}</Td>
                  <Td fontWeight="bold">{car.carType}</Td>
                  <Td fontWeight="bold">{car.Location}</Td>
                  <Td fontWeight="bold">{car.range}</Td>
                  <Td fontWeight="bold">{car.driverName}</Td>
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

export default Runningcar;
