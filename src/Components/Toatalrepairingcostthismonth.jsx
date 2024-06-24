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
} from "@chakra-ui/react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";


const Totalrepairingcost = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data from API when component mounts
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/carRepairDetailCostHistory"
      );
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
   <>
   
   <Flex direction="row" h="100vh">
      <Flex direction="column" flex="1">
        <Button
          mr={{ base: "none", md: "500px" }}
          variant="unstyled"
          display="flex"
          alignItems="start"
        >
          <NavLink to={"/Driverlist"}>
            <IoIosArrowBack style={{ width: "30px", height: "30px" }} />
          </NavLink>
          <Text marginLeft="2px" fontSize={20}>
            Total Repairing Cost This Month
          </Text>
        </Button>
        <Table variant="simple" mt={10}>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Vehicle Name</Th>
              <Th>vehicle Number</Th>
              <Th>startDate</Th>
              <Th>endDate</Th>
              <Th>cost</Th>
              <Th>issue detail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {carData.map((car, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td> {/* S.No */}
                <Td>{car.vehicleName}</Td>
                <Td>{car.vehicleNo}</Td>
                <Td>{car.dateOfRepairing}</Td>
                <Td>{car.dateOfCarRepaired}</Td>
                <Td>{car.totalCostOfRepairing}</Td>
                {/* <Td>
                  <Button colorScheme="blue" size="md">
                    <NavLink to={"/Driverdetail"}>Details</NavLink>
                  </Button>
                </Td> */}
                <Td>
                  <Text
                  // bg={car.paymentMethod === "online" ? "green" : "orange"}
                  // color="white"
                  // px={2}
                  // borderRadius="md"
                  >
                    {car.issueDetail}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box flex="1">{children}</Box>
      </Flex>
    </Flex>
   </>
  );
};

export default Totalrepairingcost;
