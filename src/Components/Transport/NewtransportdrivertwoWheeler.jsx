import { useState, useEffect } from "react";
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
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { IoIosArrowBack, IoMdArrowForward } from "react-icons/io";
import Home from "../Home";

const NewtransportdrivertwoWheeler = ({ children }) => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    // Fetch car data when component mounts
    axios
      .get("http://localhost:8080/hub/getCourierPendingListForTwo/52")

      .then((response) => {
        // Assuming data is structured as shown in your example
        if (response.data && response.data.data) {
          setCarData(response.data.data);
        } else {
          console.error("No data received from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching car data: ", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <Flex direction="column" h="100vh">
        <Flex alignItems="center" justify="space-between" p={4}>
          <Flex alignItems="center">
            <NavLink to={"/Transportdriver"}>
              <IoIosArrowBack style={{ width: "30px", height: "30px" }} />
            </NavLink>
            <Text fontSize={20} fontWeight="bold" ml={4}>
              Two Wheeler New Transport Driver
            </Text>
          </Flex>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Driver Image</Th>
              <Th>Name</Th>
              <Th>Driver ID</Th>
              <Th>Contact</Th>
              <Th>Email ID</Th>
              <Th>Status</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {carData.map((car, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  <Image
                    src={car.imageUrl}
                    alt={car.name}
                    borderRadius="full"
                    boxSize="50px"
                  />
                </Td>
                <Td>{car.name}</Td>
                <Td>{car.id}</Td>
                <Td>{car.phoneNo}</Td>
                <Td>{car.email}</Td>
                <Td>
                  <Text
                    bg={car.status === "OK" ? "green" : "orange"}
                    color="white"
                    px={2}
                    borderRadius="md"
                    padding="2"
                  >
                    {car.status}
                  </Text>
                </Td>
                <Td>
                  <Button colorScheme="blue" size="md">
                    <NavLink to={`/PendingDetailDriverTwoWheeler/${car.id}`}>
                      Details
                    </NavLink>
                  </Button>
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

export default NewtransportdrivertwoWheeler;
