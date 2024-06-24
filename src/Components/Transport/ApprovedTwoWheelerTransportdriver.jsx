import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Flex,
  Button,
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import { IoIosArrowBack, IoMdArrowForward } from "react-icons/io";

const ApprovedTwoWheelerTransportdriver = ({ children }) => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hub/getCourierApprovedListForTwo/52"
        );
        setCarData(response.data.data); // Accessing the 'data' property of the response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Flex alignItems="center" justify="space-between" p={4}>
        <Flex alignItems="center">
          <NavLink to={"/Driverlist"}>
            <IoIosArrowBack style={{ width: "30px", height: "30px",marginTop:"30px" }} />
          </NavLink>
          <Text fontSize={20} fontWeight="bold" ml={4} mt="30px">
            Approved Transport Driver
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          backgroundColor="gray.100"
          borderRadius="10"
          padding="5"
        >
          <Text fontSize={16} fontWeight="bold" mt="20px">
            New Transport Driver
          </Text>
          <NavLink to={"/NewtransportdrivertwoWheeler"}>
            <IoMdArrowForward
              style={{ width: "20px", height: "20px", marginLeft: "5px",marginTop:"30px" }}
            />
          </NavLink>
        </Flex>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Name</Th>
            <Th>Driver Id</Th>
            <Th>Contact</Th>
            <Th>Email ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {carData.map((driver, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td> {/* S.No */}
              <Td>{driver.name}</Td>
              <Td>{driver.id}</Td>
              <Td>{driver.phoneNo}</Td>
              <Td>{driver.email}</Td>
              <Td>
                {/* Details button */}
                <Button colorScheme="blue" size="md">
                  <NavLink to={`/ApprovedDetailTwoWheelerDriver/${driver.id}`}>
                    Details
                  </NavLink>
                </Button>
              </Td>
              <Td>{driver.status}</Td> {/* Status */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default ApprovedTwoWheelerTransportdriver;
