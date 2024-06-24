import { useState } from "react";
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
import { NavLink } from "react-router-dom"; // Import NavLink

const Chargecar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [conditionInputVisible, setConditionInputVisible] = useState(false);

  const demoData = [
    {
      sNo: 1,
      driverName: "John Doe",
      driverId: "RWI123",
      carName: "Toyota Corolla",
      carNumber: "ABC123",
      Return: "",
      carcondition: "Good",
      Returnrequest: "Return",
      chargeTime: "2 hours", // New field
      dateTime: "2024-03-02 10:00 AM", // New field
      changeRequest: "Request", // New field
    },
  ];

  const handleReturnRequest = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRadioChange = (value) => {
    if (value === "other") {
      setConditionInputVisible(true);
    } else {
      setConditionInputVisible(false);
    }
  };

  return (
    <>
      <Flex direction="row" h="100vh">
        <Flex direction="column" flex="1">
          <Box
            position="relative"
            w={{ base: "50%", md: "20%" }}
            h={{ base: "25px", md: "10px" }}
            p={4}
            bg="white"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: "10px" }}
            ml={{ base: 0, md: "100px" }}
          >
            <Text position="absolute" top="5px" left="50px" fontWeight="bold">
              Car At Charge
            </Text>
            <NavLink to={"/Runningcar"}>
              <Icon
                as={IoChevronBack}
                position="absolute"
                top="8px"
                left="5px"
              />
            </NavLink>
          </Box>
          <Box
            w="900px"
            overflowY="auto"
            bg="white"
            borderRadius="10px"
            border="1px solid black"
            borderColor="blue.200"
            marginTop="10px"
            ml={{ base: "none", md: "100px" }}
            overflowY="auto"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    S No.
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Driver Name
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Car Name
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Approximate Charge Time
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Date and Time
                  </Th>
                  <Th style={{ background: "#355eef", color: "black" }}>
                    Change Request
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {demoData.map((car, index) => (
                  <Tr key={index}>
                    <Td>{car.sNo}</Td>
                    <Td>{car.driverName}</Td>
                    <Td>{car.carName}</Td>
                    <Td>{car.chargeTime}</Td>
                    <Td>{car.dateTime}</Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleReturnRequest(car)}
                      >
                        <NavLink to={"/Carlist"}>Approve</NavLink>
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box flex="1">{children}</Box>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> Return Request Accepted</ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={handleCloseModal}>
                  Dashboard
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </>
  );
};

export default Chargecar;
