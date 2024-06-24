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


const TransportRequestDriver = ({ children }) => {
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
     
     <Flex direction="row" h="100vh" mt={10} ml={14}>
            <Flex direction="column" flex="1">
                <Button
                    mr={{ base: "none", md: "500px" }}
                    variant="unstyled"
                    display="flex"
                    alignItems="center" // Adjusted alignment to center vertically
                    marginLeft={"-50%"}
                >
                    <NavLink to={"/"}>
                        <IoIosArrowBack style={{ width: "30px", height: "30px", marginRight: "10px" }} /> {/* Adjusted marginRight */}
                    </NavLink>
                    <Text fontSize={20}>
                        Request Driver’s
                    </Text>
                </Button>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>S.No</Th>
                            <Th>Driver Name</Th>
                            <Th>Driver ID</Th>
                            <Th>Contact</Th>
                            <Th>Date of Request</Th>
                            <Th>View</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {carData.map((car, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td> {/* S.No */}
                                <Td>mani</Td>
                                <Td>{car.driverId}</Td>
                                <Td>{car.phoneNo}</Td>
                                <Td>
                                    March 12, 2023
                                </Td>
                                <Td>
                                    <Button colorScheme="blue" size="md">
                                        <NavLink to={"/TransportDriverDetails"}>Details</NavLink>
                                    </Button>
                                </Td>
                                <Td>
                                    <Text
                                        px={2}
                                        borderRadius="md"
                                    >
                                       Pending
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

export default TransportRequestDriver;
