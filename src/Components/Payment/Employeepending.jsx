// Employeepending.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";

const Employeepending = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const adminId = sessionStorage.getItem("id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hub/employee/hub-employee-payemnt-list/${adminId}`
        );
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px"
        px={[4, 6]}
      >
        {/* Content Area */}
      </Flex>
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px"
        px={[4, 6]}
      >
        <FaChevronLeft />
        <Box
          p={6}
          mb={4}
          marginTop="500px"
          marginRight="40px"
          marginLeft="20px"
          height="400px"
          width="1000px"
        >
          <Flex
            flexDirection="column"
            py={5}
            pr={2}
            bg="white"
            rounded="2xl"
            border="px solid"
            borderColor="#13C39C"
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
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  textDecoration={"underline"}
                  color="blue"
                >
                  Payment Details
                </Text>
              </Flex>
              <Flex
                gap={1.5}
                alignSelf="center"
                px={1}
                mt={6}
                ml={-4}
                fontSize="sm"
                fontWeight="medium"
                color="gray.800"
              ></Flex>
            </Flex>
            <Table variant="simple" mt={6} maxW="892px" border="3px solid #13C39C">
              <Thead>
                <Tr>
                  <Th>S No</Th>
                  <Th>Employee Name</Th>
                  <Th>Address</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>

                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paymentDetails.map((detail, index) => (
                  <Tr key={index + 1}>
                    <Td>{index + 1}</Td>
                    <Td>{detail.employeeName}</Td>
                    <Td>{detail.address}</Td>
                    <Td>{detail.date}</Td>
                    <Td>{detail.totalAmount}</Td>
                    <Td>
                      <Link to={`/Paymentdetails/${detail.employeeOrderId}`}>
                        <Button colorScheme="blue" size="sm">
                          Pending Payment
                        </Button>
                      </Link>
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

export default Employeepending;
