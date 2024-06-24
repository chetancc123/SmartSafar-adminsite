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
import { useState, useEffect } from "react";
import axios from "axios";
import CarRepairingAppointment from "../Test";
import BarChart from "../ScheduleBarChart";

import { NavLink } from "react-router-dom";

const Management = () => {
  const [carData, setCarData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [totalRepairCost, setTotalRepairCost] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState([]); // State to hold payment details

  useEffect(() => {
    // Fetch total repair cost when component mounts
    axios
      .get("http://localhost:8080/hub/totalCostOfRepairingForCurrentMonth", {
        headers: {
          Cookie: "JSESSIONID=8983F1A13AA6D38696F64F7583C030D7",
        },
      })
      .then((response) => {
        setTotalRepairCost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total repair cost:", error);
      });

    // Fetch payment details
    axios
      .get("http://localhost:8080/hub/1/driverPaymentDetails")
      .then((response) => {
        setPaymentDetails(response.data); // Update state with fetched payment details
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });
  }, []);

  return (
    <>
      <Flex flexDirection="row" mt="3%">
        <NavLink to={"/Managermanagemant"}>
          <Box
            border={"1px"}
            width={200}
            height={12}
            backgroundColor={"blue.600"}
            textColor={"white"}
            rounded={10}
            textStyle={"bold"}
            ml={10}
            pl={5}
            pt={2}
          >
            <button>Management</button>
          </Box>
        </NavLink>

        <NavLink to={"/ExactRepairAmount"}>
          <Box
            border={"1px"}
            width={200}
            height={12}
            backgroundColor={"blue.600"}
            textColor={"white"}
            rounded={10}
            textStyle={"bold"}
            ml={10}
            pl={5}
            pt={2}
          >
            <button>CAR REPAIR DETAIL</button>
          </Box>
        </NavLink>

        <NavLink to="/Totalrepairingcost" style={{ textDecoration: "none" }}>
          <Button
            ml={100}
            textColor="white"
            fontWeight="bold"
            variant="outline"
            borderColor="blue.600"
            backgroundColor={"blue.600"}
          >
            Total repair cost this month = {totalRepairCost || "..."}
          </Button>
        </NavLink>
        {/* <Text>100</Text> */}
      </Flex>

      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px" // Adjust based on your header height
        px={[4, 6]}
      >
        {/* Content Area */}
      </Flex>
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px" // Adjust based on your header height
        px={[4, 6]}
        // overflowX={"auto"}
      >
        <Flex
          flexDirection="column"
          py={5}
          pr={2}
          bg="white"
          rounded="2xl"
          borderOpacity="0.8"
          border="1px solid black"
          width="80%"
          overflowY="auto"
          mt="250px"
          ml="-220px"
        >
          <Flex
            gap={5}
            justify="space-between"
            items="flex-end"
            px={1}
            w="full"

            // overflowY="auto" // Remove this line
          >
            <Flex flexDirection="column" flex={1} alignSelf="flex-start" mt={2}>
              <NavLink to={"/Bankpayment1"}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  textDecoration={"underline"}
                  color="blue"
                >
                  {" "}
                  Driver Payment Details{" "}
                </Text>
              </NavLink>
            </Flex>
            <Flex
              gap={1.5}
              alignSelf="center"
              px={1}
              mt={6}
              ml={-4}
              // mb={-100}
              fontSize="sm"
              fontWeight="medium"
              color="gray.800"
            ></Flex>
          </Flex>
          <Box maxH="200px" overflowY="auto">
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
                    <Td>{detail.driverName}</Td>
                    <Td>{detail.address}</Td>
                    <Td>{detail.driverid}</Td>
                    <Td>{detail.date}</Td>
                    <Td>{detail.totalAmount}</Td>
                    <Td
                      backgroundColor={"blue.500"}
                      rounded={20}
                      width={10}
                      height={1}
                    >
                      {" "}
                      <button>{detail.status}</button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>

      {/* <CarRepairingAppointment /> */}
      <Box mt="45%" marginLeft="-32%">
        <BarChart />
      </Box>
    </>
  );
};

export default Management;
