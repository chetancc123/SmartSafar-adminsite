import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Flex,
  Table,
  Box,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";


const Totallist = ({ children }) => {
  const [carData, setCarData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/get-all-driver-list"
      );
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
   <>
   
   <Flex direction="column" h="100vh">
      <NavLink to={"/driverlist"}>
        <Button
          marginLeft="20px"
          variant="unstyled"
          display="flex"
          alignItems="start"
          mr={{ base: "none", md: "-200px" }}
        >
          <IoIosArrowBack style={{ width: "30px", height: "30px" }} />
          <Text fontSize={20}>Total Driver List</Text>
        </Button>
      </NavLink>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Name</Th>
            <Th>Driver ID</Th>
            <Th>Contact</Th>
            <Th>Email ID</Th>
            <Th>View</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {carData.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.driverId}</Td>
              <Td>{item.phoneNo}</Td>
              <Td>{item.email}</Td>
              <Td>
                <Link to={`/Driverdetail/${item.driverId}`}>
                  <Button colorScheme="blue" size="md">
                    Details
                  </Button>
                </Link>
              </Td>
              <Td>
                <Text
                  bg={item.status === "ongoing" ? "green" : "orange"}
                  color="white"
                  px={2}
                  borderRadius="md"
                >
                  {item.status}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Box flex="1">{children}</Box>
    </Flex>
   </>
  );
};

export default Totallist;
