import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const MaintenanceHome = ({ children }) => {
  const [carData, setCarData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("id");
  useEffect(() => {
    const fetchCarRepairsList = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/admin/PendingCarRepairsList",
        headers: {},
      };

      try {
        const response = await axios.request(config);
        setCarData(response.data);
      } catch (error) {
        console.error("Error fetching car repairs list:", error);
      }
    };

    fetchCarRepairsList();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredCarData = carData.filter((car) => {
    if (filter === "All") return true;
    if (filter === "E-bike") return car.vehicleType.toLowerCase() === "e-bike";
    if (filter === "Car") return car.vehicleType.toLowerCase() === "car";
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
      <Flex mt={4} justifyContent="center">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => setCurrentPage(number)}
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
      <Box marginTop="12" fontSize={20} marginLeft="10" width="80">
        <NavLink to={"/Driverlist"}>
          <Text fontWeight="500" mr={50}>
            Car Maintenance Detail
          </Text>
        </NavLink>
      </Box>

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
            border="3px solid #13C39C"
            ml={{ base: "none", md: "100px" }}
          >
            {/* Dropdown filter */}
            {/* <Box mb={4}>
              <Select value={filter} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="E-bike">E-bike</option>
                <option value="Car">Car</option>
              </Select>
            </Box> */}

            {/* Table header */}
            <Flex direction={{ base: "column", md: "row" }}>
              <Box flex="1">
                <Text as="strong">S.No</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Vehicle Name</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Vehicle Number</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Problem</Text>
              </Box>
              <Box flex="2">
                <Text as="strong">Details</Text>
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
                >
                  <Box flex={{ base: "100%", md: "1" }}>
                    <Text>{indexOfFirstItem + index + 1}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.vehicleName}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.vehicleNo}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <Text>{car.message}</Text>
                  </Box>
                  <Box flex={{ base: "100%", md: "2" }}>
                    <NavLink to={`/Carmaintainancedetail/${car.carRepairId}`}>
                      <Button bg="Teal">Detail</Button>
                    </NavLink>
                  </Box>
                </Flex>
              ))}
          </Box>
          {renderPagination()}
          <Box flex="1">{children}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default MaintenanceHome;
