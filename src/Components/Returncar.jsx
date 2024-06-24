import { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaCar } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Radio,
  RadioGroup,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom"; // Import NavLink
import axios from "axios";


const Returncar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [conditionInputVisible, setConditionInputVisible] = useState(false);
  const [returnCars, setReturnCars] = useState([]);
  const [changeCars, setChangeCars] = useState([]);

  useEffect(() => {
    // Fetch data for returning cars
    axios
      .get("http://localhost:8080/hub/get-all/returncar/2/driverlist")
      .then((response) => {
        setReturnCars(response.data);
        console.log("car", returnCars);
      })
      .catch((error) => {
        console.error("Error fetching return cars:", error);
      });

    // Fetch data for changing cars
    axios
      .get("http://localhost:8080/hub/get-all/carchange/1/driverlist")
      .then((response) => {
        setChangeCars(response.data);
        console.log("change", changeCars);
      })
      .catch((error) => {
        console.error("Error fetching change cars:", error);
      });
  }, []);

  console.log("car", returnCars);
  const handleReturnRequest = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRadioChange = (value) => {
    if (value === 0) {
      setConditionInputVisible(true); // Set the condition input visible
    } else if (value === 1) {
      setConditionInputVisible(true); // Set the condition input visible
    } else if (value === 2) {
      setConditionInputVisible(true); // Set the condition input visible
    } else {
      setConditionInputVisible(false); // Set the condition input invisible for other values
    }
  };

  const demoData = [].map((car, index) => ({ ...car, sNo: index + 1 })); // Add sNo field dynamically

  const handleApprove = (car) => {
    // Dummy implementation, you can replace it with your actual logic
    console.log("Approving car:", car);
  };

  return (
   <>
  
   <Flex direction="row" h="100vh">
      <Flex direction="column" flex="1">
        <Box overflowY="auto">
          <Box
            position="relative"
            w={{ base: "50%", md: "20%" }}
            h={{ base: "25px", md: "10px" }}
            p={4}
            bg="white"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: "10px" }}
            mr={{ base: 0, md: 10 }}
          >
            <Text
              position="absolute"
              top="5px"
              ml={{ base: "none", md: "120px" }}
              fontWeight="bold"
            >
              Return car
            </Text>
            <NavLink to={"/Runningcar"}>
              <Icon
                as={IoChevronBack}
                position="absolute"
                top="8px"
                ml={{ base: "none", md: "100px" }}
              />
            </NavLink>
          </Box>
          <Box
            w="900px"
            overflowY="auto"
            bg="white"
            borderRadius="10px"
            border="2px solid black"
            borderColor="blue.200"
            marginTop="10px"
            ml={{ base: "none", md: "120px" }}
          >
             <Table variant="simple">
            <Thead>
                <Tr>
                    <Th style={{ background: "#355eef", color: "black" }}>S No.</Th>
                    <Th style={{ background: "#355eef", color: "black" }}>Driver Name</Th>
                    <Th style={{ background: "#355eef", color: "black" }}>Driver ID</Th>
                    <Th style={{ background: "#355eef", color: "black" }}>Car Name</Th>
                    <Th style={{ background: "#355eef", color: "black" }}>Car Number</Th>
                    <Th style={{ background: "#355eef", color: "black" }}>Return Date & Time</Th>
                    <Th style={{ background: "#355eef", color: "black" }}>Car Condition</Th>
                    <Th style={{ background: "#355eef", color: "black" }}>Return Request</Th>
                </Tr>
            </Thead>
            <Tbody>
                {returnCars.map((car, index) => (
                    <Tr key={index}>
                        <Td fontWeight="bold">{index + 1}</Td>
                        <Td fontWeight="bold">{car.driverName}</Td>
                        <Td fontWeight="bold">{car.driverId}</Td>
                        <Td fontWeight="bold">{car.vehicleName}</Td>
                        <Td fontWeight="bold">{car.vehicleNo}</Td>
                        <Td fontWeight="bold">{car.returnTime}</Td>
                        <Td fontWeight="bold">
                            {car.carCondition}
                            <RadioGroup value={car.carCondition}>
                                <Flex direction="row" gap="10px">
                                    <Radio value="WORST" borderColor={car.carCondition === "WORST" ? "red" : "red"} isDisabled={true}></Radio>
                                    <Radio value="NORMAL" borderColor={car.carCondition === "NORMAL" ? "blue" : "blue"} isDisabled={true}></Radio>
                                    <Radio value="GOOD" borderColor={car.carCondition === "GOOD" ? "green" : "green"} isDisabled={true}></Radio>
                                </Flex>
                            </RadioGroup>
                        </Td>
                        <Td fontWeight="bold">
                      {car.changeRequest}
                      <NavLink to={"/Carlist"}>
                        <Button
                          colorScheme="blue"
                          onClick={() => handleReturnRequest(car)}
                        >
                          Return
                        </Button>
                      </NavLink>
                    </Td>
                        {/* <Td fontWeight="bold">
                            {car.Returnrequest === "Return" && (
                                <Button colorScheme="blue" onClick={() => handleReturnRequest(car)}>
                                    Return
                                </Button>
                            )}
                        </Td> */}
                    </Tr>
                ))}
            </Tbody>
        </Table>
          </Box>
          {/* Duplicate the Box with different content */}
          <Box
            position="relative"
            w={{ base: "50%", md: "20%" }}
            h={{ base: "25px", md: "10px" }}
            p={4}
            bg="white"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: "10px" }}
            ml={{ base: "none", md: "120px" }}
          >
            <Text
              position="absolute"
              top="5px"
              ml={{ base: "none", md: "50px" }}
              fontWeight="bold"
            >
              Change car
            </Text>

            <NavLink>
              <Icon
                as={IoChevronBack}
                position="absolute"
                top="8px"
                ml={{ base: "none", md: "10px" }}
              />
            </NavLink>
          </Box>
          <Box
            w="900px"
            overflowY="auto"
            bg="white"
            borderRadius="10px"
            border="2px solid blue"
            borderColor="blue.200"
            marginTop="10px"
            ml={{ base: "none", md: "120px" }}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    S No.
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Driver Detail
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    CR Detail
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Description
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Date & Time
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Change Request
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {changeCars.map((car, index) => (
                  <Tr key={index}>
                    <Td fontWeight="bold">{index + 1}</Td>
                    <Td fontWeight="bold">{`${car.driverName} - ${car.driverId}`}</Td>
                    <Td fontWeight="bold">{`${car.carName} - ${car.carNumber}`}</Td>
                    <Td fontWeight="bold">{car.changeReason}</Td>
                    <Td fontWeight="bold">{car.returnTime}</Td>
                    <Td fontWeight="bold">
                      {car.changeRequest}
                      <NavLink to={"/Carlist"}>
                        <Button
                          colorScheme="blue"
                          onClick={() => handleApprove(car)}
                        >
                          Approve
                        </Button>
                      </NavLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        <Box flex="1">{children}</Box>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Return Request Accepted</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleCloseModal}>
                <NavLink to={"/Carlist"}>Dashboard</NavLink>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
   </>
  );
};

export default Returncar;
