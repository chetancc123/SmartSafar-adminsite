import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Flex, Box, Icon, Text, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Carmaintance from "../Transport/Carmaintance";
import Carmaintancecount from "./Carformaintainencecount";


const Managermanagemant = ({ children }) => {
  const [employeeCount, setEmployeeCount] = useState(null);
  const [carCount, setCarCount] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hub/employee/employeeCount/1"
        );
        setEmployeeCount(response.data);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    fetchData();
  }, []);

  const demoData = [
    // Your demo data
  ];

  const paymentDetails = [
    // Your payment details
  ];

  return (
    <>
    
      <Flex
        direction={{ base: "column", md: "row" }}
        ml={{ base: "none", md: "90px" }}
      >
        {/* Boxes 1 to 4 */}

        <Box
          position="relative"
          w={{ base: "80%", md: "20%" }}
          h={{ base: "25px", md: "150px" }}
          p={4}
          bg="white"
          boxShadow="md"
          border="3px solid  blue"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            {" "}
            Car for Return
          </Text>
          <NavLink to={"/Carmaintance"}>
            {" "}
            <Icon
              as={FaBars}
              position="absolute"
              color="blue"
              top="5px"
              right="5px"
            />
          </NavLink>
          <Text
            position="absolute"
            top="45px"
            left="105px"
            fontWeight="bold"
            fontSize={40}
          >
            <Carmaintancecount setCarCount={setCarCount} />
            {/* {carCount} */}
          </Text>
        </Box>
        {/* Box 2 */}
        <Box
          position="relative"
          w={{ base: "50%", md: "20%" }}
          h={{ base: "auto", md: "150px" }}
          p={4}
          bg="white"
          boxShadow="md"
          border="3px solid  blue"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            Employee Detail
          </Text>
          <NavLink to={"/Employeepage"}>
            <Icon as={FaUser} position="absolute" top="5px" right="5px" />
          </NavLink>{" "}
          <Text
            position="absolute"
            top="45px"
            left="105px"
            fontWeight="bold"
            fontSize={40}
          >
            {employeeCount}
          </Text>
        </Box>
        {/* Box 3 */}
        <Box
          position="relative"
          w={{ base: "50%", md: "20%" }}
          h={{ base: "auto", md: "150px" }}
          p={4}
          bg="white"
          boxShadow="md"
          border="3px solid  blue"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            {" "}
            Employee payment pending
          </Text>
          <NavLink to={"/Employeepending"}>
            {" "}
            <Icon
              as={FaBars}
              position="absolute"
              color="blue"
              top="5px"
              right="5px"
            />{" "}
          </NavLink>
        </Box>
        {/* Box 4 */}
        <Box
          position="relative"
          w={{ base: "50%", md: "20%" }}
          h={{ base: "auto", md: "150px" }}
          p={4}
          border="3px solid  blue"
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            {" "}
            Drive payment pending
          </Text>
          <NavLink to={"/Payment"}>
            {" "}
            <Icon as={FaBars} position="absolute" top="5px" right="5px" />
          </NavLink>{" "}
        </Box>

        <Box
          position="relative"
          w={{ base: "80%", md: "20%" }}
          h={{ base: "25px", md: "150px" }}
          p={4}
          bg="white"
          boxShadow="md"
          border="3px solid  blue"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            {" "}
            Car for Repairing
          </Text>
          <NavLink to={"/CarForRepairing"}>
            {" "}
            <Icon
              as={FaBars}
              position="absolute"
              color="blue"
              top="5px"
              right="5px"
            />
          </NavLink>
          <Text
            position="absolute"
            top="45px"
            left="105px"
            fontWeight="bold"
            fontSize={40}
          >
            <Carmaintancecount setCarCount={setCarCount} />
            {/* {carCount} */}
          </Text>
        </Box>
      </Flex>

      <Flex direction="row" h="40vh" marginTop="10">
        <Box
          w={{ base: "80%", md: "80%" }}
          h={{ base: "25px", md: "auto" }}
          bg="white"
          height="440"
          borderRadius="10px"
          border="3px solid blue"
          // overflowY="scroll"
          marginTop="15px"
          marginLeft={{ base: "none", md: "80px" }}
        >
          <Carmaintance width="100%"  >{/* Children components */}</Carmaintance>
        </Box>
      </Flex>
      <Flex direction="row" h="40vh" marginTop="10">
        <Box
          bg="gray.100"
          w={{ base: "80%", md: "80%" }}
          h={{ base: "25px", md: "auto" }}
          overflowY="scroll"
          borderRadius="10px"
          marginRight="40px"
          marginLeft="80px"
          border="3px solid  blue"
        >
          <Flex
            flexDirection="column"
            py={5}
            pr={2}
            bg="white"
            rounded="2xl"
            borderColor="blue.600"
            borderOpacity="0.8"
          >
            <Flex
              gap={5}
              justify="space-between"
              items="flex-end"
              px={1}
              w="full"
            >
              <Flex
                flexDirection="column"
                flex={1}
                alignSelf="flex-start"
                mt={2}
              >
                <Text fontSize="xl" fontWeight="bold" color="indigo.900">
                  Driver Payment Details
                </Text>
              </Flex>
              <Flex
                gap={1.5}
                alignSelf="center"
                px={1}
                mt={6}
                ml={400}
                fontSize="sm"
                fontWeight="medium"
                color="gray.800"
              ></Flex>
            </Flex>
            <Table variant="simple" mt={6}>
              <Thead>
                <Tr>
                  <Th>Driver Name</Th>
                  <Th>Address</Th>
                  <Th>Driver ID</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paymentDetails.map((detail, index) => (
                  <Tr key={index}>
                    <Td>{detail.driverName}</Td>
                    <Td>{detail.address}</Td>
                    <Td>{detail.driverID}</Td>
                    <Td>{detail.date}</Td>
                    <Td>{detail.amount}</Td>
                    <Td>
                      {/* Conditionally render NavLink for pending status */}
                      {detail.status === "pending" ? (
                        <NavLink to="/Payment">
                          <Button colorScheme="red">{detail.status}</Button>
                        </NavLink>
                      ) : (
                        <Button colorScheme="blue">{detail.status}</Button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Managermanagemant;
