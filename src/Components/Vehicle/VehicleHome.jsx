import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";

const VehicleHome = ({ children }) => {
  const [carData, setCarData] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedCars, setSelectedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Items per page
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("id");
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/vehicles/no-hub/${adminId}`
        );
        setCarData(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    const fetchTransportData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/list-all-non-assign-ebikeTohub/${adminId}`
        );
        setTransportData(response.data);
      } catch (error) {
        console.error("Error fetching transport data:", error);
      }
    };

    fetchCarData();
    fetchTransportData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCheckboxChange = (event, car) => {
    if (event.target.checked) {
      setSelectedCars([...selectedCars, car]);
    } else {
      setSelectedCars(
        selectedCars.filter(
          (selectedCar) => selectedCar.vehicleNo !== car.vehicleNo
        )
      );
    }
  };

  const handleSaveAndContinue = () => {
    navigate("/SelectedCarsPage", { state: { selectedCars } });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredCarData = filter === "TRANSPORT" ? transportData : carData.filter((car) => {
    if (filter === "All") return true;
    if (filter === "TWO_WHEELER")
      return car.vehicleType.toLowerCase() === "two_wheeler";
    if (filter === "FOUR_WHEELER")
      return car.vehicleType.toLowerCase() === "four_wheeler";
    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredCarData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCarData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <Flex mt={4} justifyContent="center" >
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => handlePageChange(number)}
            colorScheme={currentPage === number ? "teal" : "gray"}
            mx={1}
          >
            {number}
          </Button>
        ))}
      </Flex>
    );
  };

  return (
    <>
      <Flex direction="row" h="100vh" ml="10px" width="auto">
        <Flex direction="column" flex="1">
          <Box display="flex" justifyContent="flex-end" mt={14}>
            <NavLink to={"/AssignedVehicle"}>
              <Button colorScheme="teal">Assigned Vehicles</Button>
            </NavLink>
          </Box>
          <Box
            w={{ base: "100%", md: "80%" }}
            p={4}
            bg="gray.100"
            boxShadow="md"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: 10 }}
            overflowY="auto"
            border="3px solid #13C39C"
            ml={{ base: "none", md: "100px" }}
          >
            {/* Dropdown filter */}
            <Box mb={4}>
              <Select value={filter} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="TWO_WHEELER">BIKE</option>
                <option value="FOUR_WHEELER">CAR</option>
                <option value="TRANSPORT">Transport</option>
              </Select>
            </Box>

            {/* Table header */}
            {filter !== "TRANSPORT" ? (
              <>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  mb={4}
                >
                  <Box flex="1" order={{ base: 1, md: 2 }}>
                    <Text as="strong">Select</Text>
                  </Box>
                  <Box flex="1" order={{ base: 2, md: 1 }}>
                    <Text as="strong">S.No</Text>
                  </Box>
                  <Box flex="2" order={{ base: 3, md: 3 }}>
                    <Text as="strong">Vehicle Name</Text>
                  </Box>
                  <Box flex="2" order={{ base: 4, md: 4 }}>
                    <Text as="strong">Vehicle Number</Text>
                  </Box>
                  <Box flex="2" order={{ base: 5, md: 5 }}>
                    <Text as="strong">Vehicle Type</Text>
                  </Box>
                  <Box flex="2" order={{ base: 6, md: 6 }}>
                    <Text as="strong">Seating Capacity</Text>
                  </Box>
                  <Box flex="2" order={{ base: 7, md: 7 }}>
                    <Text as="strong">Insurance No</Text>
                  </Box>
                  <Box flex="2" order={{ base: 8, md: 8 }}>
                    <Text as="strong">Vehicle ID</Text>
                  </Box>
                </Flex>
                <Box borderBottom="1px solid #ccc" pb={2} mb={4}></Box>

                {/* Dynamically render data */}
                {currentData &&
                  currentData.map((car, index) => (
                    <Flex
                      key={index}
                      fontWeight="bold"
                      direction={{ base: "column", md: "row" }}
                      mt={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box flex="1" order={{ base: 1, md: 2 }}>
                        <Checkbox onChange={(e) => handleCheckboxChange(e, car)} />
                      </Box>
                      <Box flex="1" order={{ base: 2, md: 1 }}>
                        <Text>{indexOfFirstItem + index + 1}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 3, md: 3 }}>
                        <Text>{car.vehicleName}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 4, md: 4 }}>
                        <Text>{car.vehicleNo}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 5, md: 5 }}>
                        <Text>{car.vehicleType}</Text>
                      </Box>
                      <Box flex="2" ml={14} order={{ base: 6, md: 6 }}>
                        <Text>{car.seatingCapacity}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 7, md: 7 }}>
                        <Text>{car.insuranceNo}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 8, md: 8 }}>
                        <NavLink
                          to="/Assigningdriver"
                          style={{ textDecoration: "none" }}
                        >
                          <Text>{car.vehicleId}</Text>
                        </NavLink>
                      </Box>
                    </Flex>
                  ))}
              </>
            ) : (
              <>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  mb={4}
                >
                  <Box flex="1" order={{ base: 1, md: 2 }}>
                    <Text as="strong">Select</Text>
                  </Box>
                  <Box flex="1" order={{ base: 2, md: 1 }}>
                    <Text as="strong">S.No</Text>
                  </Box>
                  <Box flex="2" order={{ base: 3, md: 3 }}>
                    <Text as="strong">Bike Name</Text>
                  </Box>
                  <Box flex="2" order={{ base: 3, md: 3 }}>
                    <Text as="strong">Bike No.</Text>
                  </Box>
                  <Box flex="2" order={{ base: 4, md: 4 }}>
                    <Text as="strong">Weight</Text>
                  </Box>
                  <Box flex="2" order={{ base: 5, md: 5 }}>
                    <Text as="strong">Insurance No</Text>
                  </Box>
                  <Box flex="2" order={{ base: 6, md: 6 }}>
                    <Text as="strong">Top Speed</Text>
                  </Box>
                  <Box flex="2" order={{ base: 7, md: 7 }}>
                    <Text as="strong">RC Number</Text>
                  </Box>
                </Flex>
                <Box borderBottom="1px solid #ccc" pb={2} mb={4}></Box>

                {/* Dynamically render data */}
                {currentData &&
                  currentData.map((car, index) => (
                    <Flex
                      key={index}
                      fontWeight="bold"
                      direction={{ base: "column", md: "row" }}
                      mt={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box flex="1" order={{ base: 1, md: 2 }}>
                        <Checkbox onChange={(e) => handleCheckboxChange(e, car)} />
                      </Box>
                      <Box flex="1" order={{ base: 2, md: 1 }}>
                        <Text>{indexOfFirstItem + index + 1}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 3, md: 3 }}>
                        <Text>{car.vehicleName}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 4, md: 4 }}>
                        <Text>{car.vehicleNo}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 5, md: 5 }}>
                        <Text>{car.weight}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 6, md: 6 }}>
                        <Text>{car.insuranceNo}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 7, md: 7 }}>
                        <Text>{car.topSpeed}</Text>
                      </Box>
                      <Box flex="2" order={{ base: 8, md: 8 }}>
                        <Text>{car.rc}</Text>
                      </Box>
                    </Flex>
                  ))}
              </>
            )}
          </Box>

          {renderPagination()}

          <Box position="fixed" bottom="20px" right={80}>
            <Button colorScheme="teal" onClick={handleSaveAndContinue}>
              Save and Continue
            </Button>
          </Box>
          <Box flex="1">{children}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default VehicleHome;
