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
import { Link } from "react-router-dom";


const Activedriver = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data from API when component mounts
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/Online-Driver-list/1"
      );
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>

    <Flex direction="row" h="100vh" mt={10}>
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
          <Text marginRight="650px" fontSize={20}>
            Active Driver List
          </Text>
        </Button>
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
            {carData.map((car, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td> {/* S.No */}
                <Td>{car.name}</Td>
                <Td>{car.driverId}</Td>
                <Td>{car.phoneNo}</Td>
                <Td>{car.email}</Td>
                <Td>
                <Link to={`/Driverdetail/${car.driverId}`}>
                  <Button colorScheme="blue" size="md">
                    Details
                  </Button>
                </Link>
                </Td>
                <Td>
                  <Text
                    bg={car.status === "online" ? "green" : "orange"}
                    color="white"
                    px={2}
                    borderRadius="md"
                  >
                    {car.status}
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

export default Activedriver;
