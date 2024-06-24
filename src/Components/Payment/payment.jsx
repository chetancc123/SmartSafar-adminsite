import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { NavLink, Link as RouterLink } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { CSVLink } from "react-csv";

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/driver-payment-pending-list"
        );
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, []);

  const csvHeaders = [
    { label: "Driver Name", key: "driver.name" },
    { label: "Address", key: "driver.address" },
    { label: "Driver ID", key: "driver.driverId" },
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status" },
  ];

  return (
    <Flex justify="center" align="center" direction="row" px={[4, 6]}>
      <NavLink to={"/management1"}>
        <FaChevronLeft />
      </NavLink>
      <Box p={6} mb={4} width="1000px">
        <Flex
          flexDirection="column"
          py={5}
          pr={2}
          bg="white"
          rounded="2xl"
          border="3px solid #13C39C"
        
          borderOpacity="0.8"
        >
          <Flex gap={5} justify="space-between" px={1} w="full">
            <Flex flexDirection="column" flex={1} alignSelf="flex-start" mt={2}>
              <NavLink to={"/Bankpayment1"}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  textDecoration="underline"
                  color="blue"
                >
                  Driver Payment Detail
                </Text>
              </NavLink>
            </Flex>
            <CSVLink
              headers={csvHeaders}
              data={paymentDetails}
              filename={"payment_details.csv"}
            >
              <Button colorScheme="blue">Download Data</Button>
            </CSVLink>
          </Flex>
          <Table variant="simple" mt={6} maxW="892px">
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
                  <Td>{detail.driver.name}</Td>
                  <Td>{detail.driver.address || "N/A"}</Td>
                  <Td>{detail.driver.driverId}</Td>
                  <Td>{detail.date}</Td>
                  <Td>{detail.amount}</Td>
                  <Td>
                    <RouterLink
                      to={`/Driverpaymentdetail/${detail.driverPaymentDetailId}`}
                    >
                      <Button colorScheme="blue" size="sm">
                        {detail.status === "PENDING"
                          ? "Pay Now"
                          : detail.status}
                      </Button>
                    </RouterLink>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Payment;
