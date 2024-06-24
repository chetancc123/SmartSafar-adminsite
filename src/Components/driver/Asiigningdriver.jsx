import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";


const Assigningdriver = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverGet, setDriverGet] = useState([]);
  const [carGet, setCarGet] = useState([]);

  const fetchDriver = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/getAvailableDrivers"
      );
      setDriverGet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDriver();
  }, []);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/getAvailableCars"
      );
      setCarGet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const [formData, setFormData] = useState({
    driverName: "",
    openingTime: "",
    closeTime: "",
    locality: "",
    driverId: "",
    vehicleName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "driverName") {
      const selectedDriver = driverGet.find(
        (driver) => driver.driverName === value
      );
      if (selectedDriver) {
        setFormData((prevState) => ({
          ...prevState,
          driverId: selectedDriver.driverId,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/hub/assignCarToDriver/1", formData)
      .then((response) => {
        console.log("Data successfully submitted:", response.data);
        setIsModalOpen(true);
        setFormData({
          driverName: "",
          openingTime: "",
          closeTime: "",
          locality: "",
          driverId: "",
          vehicleName: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    
      <Flex direction="column" h="100vh" position="relative">
        {/* Navigation Header */}
        <Text
          position="absolute"
          mt={{ base: "20px", md: "20px" }}
          ml={{ base: "50px", md: "50px" }}
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          <NavLink to={"/Carlist"} style={{ textDecoration: "none" }}>
            <FaArrowLeft />
          </NavLink>
          <Text ml="10px">Car assigning to Drive</Text>
        </Text>
      </Flex>

      <Box
        w={{ base: "100%", md: "80%" }}
        p={4}
        bg="gray.100"
        boxShadow="md"
        mb={{ base: 4, md: 0 }}
        mt={{ base: 10, md: "-600px" }}
        ml={{ base: "none", md: "20px" }}
        overflowY="auto"
        border="2px solid blue"
      >
        <form onSubmit={handleSubmit}>
          <Flex align="center" mb="4">
            <Text fontSize="14" fontWeight="bold" mr="2">
              Name of Driver:
            </Text>
            <select
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              className="select-dropdown"
            >
              <option value="">Select driver...</option>
              {driverGet.map((driver, index) => (
                <option key={index} value={driver.driverName}>
                  {driver.driverName}
                </option>
              ))}
            </select>
          </Flex>

          <Flex align="center" mb="4">
            <Text fontSize="14" fontWeight="bold" mr="2">
              Opening Time:
            </Text>
            <select
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              className="select-dropdown"
            >
              <option value="">Select opening time...</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              {/* Add more opening time options as needed */}
            </select>
          </Flex>

          <Flex align="center" mb="4">
            <Text fontSize="14" fontWeight="bold" mr="2">
              Closing Time:
            </Text>
            <select
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              className="select-dropdown"
            >
              <option value="">Select closing time...</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              {/* Add more closing time options as needed */}
            </select>
          </Flex>

          <Flex align="center" mb="4">
            <Text fontSize="14" fontWeight="bold" mr="2">
              Locality:
            </Text>
            <Input
              variant="outline"
              placeholder="Telibandha"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              backgroundColor="blue.100"
              width="400px"
              borderRadius="lg"
              focusBorderColor="blue.400"
            />
          </Flex>

          <Flex align="center" mb="4">
            <Text fontSize="14" fontWeight="bold" mr="2">
              Driver ID:
            </Text>
            <Input
              variant="outline"
              placeholder="Enter driver's ID"
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              backgroundColor="blue.100"
              width="400px"
              borderRadius="lg"
              focusBorderColor="blue.400"
            />
          </Flex>

          <Flex align="center" mb="4">
            <Text fontSize="14" fontWeight="bold" mr="2">
              Available Cars:
            </Text>

            <select
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleChange}
              className="select-dropdown"
            >
              <option value="">Select car...</option>
              {carGet.map((item, index) => (
                <option key={index} value={item.vehicleName}>
                  {item.vehicleName}
                </option>
              ))}
            </select>
          </Flex>

          <Box mt="4">
            <Button type="submit" colorScheme="green">
              Assign
            </Button>
          </Box>
        </form>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent
          backgroundColor="white"
          height={{ base: "100px", md: "150px" }}
        >
          <ModalCloseButton />
          <ModalBody fontWeight="bold">
            You Have Successfully Assigned Car As A Driver
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleCloseModal}>
              <NavLink to={"/Carlist"}>Dashboard</NavLink>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Assigningdriver;
