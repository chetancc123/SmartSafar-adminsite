import { useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Flex, Box, Icon, Text, Button, Select, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { CSVLink } from "react-csv";

// Dummy data
const dummyData = [
  { vehicleName: "Car A", vehicleNo: "1234", vehicleType: "Car", seatingCapacity: 4, range: 200, vehicleStatus: "AVAILABLE" },
  { vehicleName: "Bike B", vehicleNo: "5678", vehicleType: "E-bike", seatingCapacity: 1, range: 50, vehicleStatus: "ENGAGED" },
  { vehicleName: "Car C", vehicleNo: "9101", vehicleType: "Car", seatingCapacity: 5, range: 300, vehicleStatus: "AVAILABLE" },
  { vehicleName: "Bike D", vehicleNo: "1121", vehicleType: "E-bike", seatingCapacity: 2, range: 60, vehicleStatus: "AVAILABLE" },
];

const Carlist = ({ children }) => {
  const [carData, setCarData] = useState(dummyData);
  const [filter, setFilter] = useState("All");
  const [selectedCars, setSelectedCars] = useState([]);
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (event, car) => {
    if (event.target.checked) {
      setSelectedCars([...selectedCars, car]);
    } else {
      setSelectedCars(selectedCars.filter((selectedCar) => selectedCar.vehicleNo !== car.vehicleNo));
    }
  };

  const handleSaveAndContinue = () => {
    navigate("/SelectedCarsPage", { state: { selectedCars } });
  };

  const filteredCarData = carData.filter((car) => {
    if (filter === "All") return true;
    if (filter === "E-bike") return car.vehicleType.toLowerCase() === "e-bike";
    if (filter === "Car") return car.vehicleType.toLowerCase() === "car";
    return true;
  });

  return (
    <>
      <Flex direction="row" h="100vh" ml="10px" width="auto">
        <Flex direction="column" flex="1">
          <Box
            w={{ base: "100%", md: "80%" }}
            p={4}
            bg="gray.100"
            boxShadow="md"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: 10 }}
            overflowY="auto"
            border="3px solid black"
            ml={{ base: "none", md: "100px" }}
          >
            {/* Dropdown filter */}
            /* <Box mb={4}>
              <Select value={filter} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="E-bike">E-bike</option>
                <option value="Car">Car</option>
              </Select>
            </Box> */

            {/* Table header */}
            <Flex direction={{ base: "column", md: "row" }}>
              <Box flex="1">
                <Text as="strong">Select</Text>
              </Box>
              <Box flex="1">
                <Text as="strong">S.No</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Car Name</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Car Number</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Car Type</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Capacity</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Range</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Status</Text>
              </Box>
            </Flex>
            <Box borderBottom="1px solid #ccc" pb={2} mb={4}></Box>
            {/* Dynamically render data */}
            {filteredCarData &&
              filteredCarData.map((car, index) => (
                <Flex
                  key={index}
                  fontWeight="bold"
                  direction={{ base: "column", md: "row" }}
                  mt={2}
                >
                  <Box flex={{ base: "100%", md: "1" }}>
                    <Checkbox onChange={(e) => handleCheckboxChange(e, car)} />
                  </Box>
                  <Box flex={{ base: "100%", md: "1" }}>
                    <Text>{index + 1}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.vehicleName}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.vehicleNo}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.vehicleType}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.seatingCapacity}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.range}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <NavLink
                      to="/Assigningdriver"
                      style={{ textDecoration: "none" }}
                    >
                      <Text
                        style={{
                          backgroundColor:
                            car.vehicleStatus === "AVAILABLE"
                              ? "green"
                              : "orange",
                          color: "white",
                          padding: "5px 35px",
                          borderRadius: "5px",
                        }}
                      >
                        {car.vehicleStatus}
                      </Text>
                    </NavLink>
                  </Box>
                </Flex>
              ))}
          </Box>


          <Box position="fixed" bottom="20px" right={80}>
            <Button colorScheme="teal" onClick={handleSaveAndContinue}>Save and Continue</Button>
          </Box>
          <Box flex="1">{children}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Carlist;
