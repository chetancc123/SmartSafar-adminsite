import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/react";
import axios from "axios";

const SelectedCarsPage = () => {
  const location = useLocation();
  const { selectedCars } = location.state || { selectedCars: [] };
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managers, setManagers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const adminId = sessionStorage.getItem("id");
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/get-all-hublist/${adminId}`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setManagers([]);
  };

  const handleCityChange = async (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    try {
      const response = await axios.get(`http://localhost:8080/admin/get-all-hublist/${adminId}`);
      const filteredManagers = response.data.filter((hub) => hub.city === city);
      setManagers(filteredManagers);
    } catch (error) {
      console.error("Error fetching hubs:", error);
    }
  };

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
  };

  const handleProceed = async () => {
    const vehicleIds = selectedCars.map((car) => car.vehicleId);
    const courierIds = selectedCars
      .filter((car) => car.courierEbikeId)
      .map((car) => car.courierEbikeId);

    try {
      if (courierIds.length > 0) {
        const data = [
          {
            hubName: managerName,
            city: selectedCity,
            state: selectedState,
            courierEbikeId: courierIds
          }
        ];

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:8080/admin/courierEbike/assign-hub',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(data)
        };

        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
      } else {
        const data = [
          {
            hubName: managerName,
            state: selectedState,
            city: selectedCity,
            vehicleIds
          }
        ];

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:8080/admin/vehicles/assign-hub',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(data)
        };

        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
      }
      onOpen();
    } catch (error) {
      console.error("Error assigning vehicles to hub:", error);
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Selected Cars
      </Text>
      {selectedCars.length > 0 ? (
        selectedCars.map((car, index) => (
          <Flex
            key={index}
            direction="column"
            mb={4}
            p={4}
            borderWidth="1px"
            borderRadius="md"
          >
            <Text>
              <strong>Vehicle Name:</strong> {car.vehicleName}
            </Text>
            <Text>
              <strong>Vehicle Number:</strong> {car.vehicleNo}
            </Text>
            <Text>
              <strong>Vehicle Type:</strong> {car.vehicleType}
            </Text>
            <Text>
              <strong>Seating Capacity:</strong> {car.seatingCapacity}
            </Text>
            <Text>
              <strong>Insurance NO.:</strong> {car.insuranceNo}
            </Text>
            <Text>
              <strong>Vehicle Id:</strong> {car.vehicleId}
            </Text>
            <Text>
              <strong>Courier Bike Id:</strong> {car.courierEbikeId}
            </Text>
          </Flex>
        ))
      ) : (
        <Text>No cars selected.</Text>
      )}

      <Box mt={4}>
        <Text fontSize="lg" mb={2}>
          Select State
        </Text>
        <Select
          placeholder="Select state"
          value={selectedState}
          onChange={handleStateChange}
        >
          {[...new Set(cities.map((city) => city.state))].map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </Box>

      {selectedState && (
        <Box mt={4}>
          <Text fontSize="lg" mb={2}>
            Select City
          </Text>
          <Select
            placeholder="Select city"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {cities
              .filter((city) => city.state === selectedState)
              .map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
          </Select>
        </Box>
      )}

      {selectedCity && (
        <Box mt={4}>
          <Text fontSize="lg" mb={2}>
            Select Hub Name
          </Text>
          <Select
            placeholder="Select Hub Name"
            value={managerName}
            onChange={handleManagerChange}
          >
            {managers.map((manager, index) => (
              <option key={index} value={manager.hubName}>
                {manager.hubName}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {selectedState && managerName && (
        <Box mt={4}>
          <Text fontSize="lg">
            Vehicle Ids: {selectedCars.map(car => car.vehicleId).join(", ")} | Selected State: {selectedState} | Selected City: {selectedCity} | Selected Hub: {managerName}
          </Text>
          <Button mt={10} colorScheme="teal" onClick={handleProceed}>
            Proceed
          </Button>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalBody>
            <Text>The vehicles have been successfully assigned to the hub.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SelectedCarsPage;
