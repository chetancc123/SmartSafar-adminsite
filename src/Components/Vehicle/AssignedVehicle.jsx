import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Flex,
  Select,
  Button,
} from "@chakra-ui/react";
import axios from 'axios';
import { CSVLink } from "react-csv";

// Utility function to format date
const formatDateToLocal = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

const AssignedVehicle = () => {
  const [assignedData, setAssignedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [cityFilter, setcityFilter] = useState("");
  const [citys, setcitys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const adminId = sessionStorage.getItem("id");
  useEffect(() => {
    axios.get(`http://localhost:8080/admin/vehicles/available-hub/${adminId}`)
      .then((response) => {
        const dataWithFormattedDate = response.data.map(item => ({
          ...item,
          assignHubDate: formatDateToLocal(item.assignHubDate),
        }));

        setAssignedData(dataWithFormattedDate);
        setFilteredData(dataWithFormattedDate); // Initialize filtered data

        // Extract unique citys
        const uniquecitys = [...new Set(dataWithFormattedDate.map(data => data.hub.city))];
        setcitys(uniquecitys);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (vehicleTypeFilter === "TRANSPORT") {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/admin/couriers/available-hub/${adminId}`,
        headers: {}
      };
  
      axios.request(config)
        .then((response) => {
          const dataWithFormattedDate = response.data.map(item => ({
            ...item,
            assignHubDate: formatDateToLocal(item.assignHubDate),
          }));
          setTransportData(dataWithFormattedDate);
          setFilteredData([]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let data = assignedData;
  
      if (vehicleTypeFilter) {
        data = data.filter((item) => item.vehicleType === vehicleTypeFilter);
      }
  
      if (cityFilter) {
        data = data.filter((item) => item.hub.city === cityFilter);
      }
  
      setFilteredData(data);
      setTransportData([]);
    }
    setCurrentPage(1); // Reset to the first page on filter change
  }, [vehicleTypeFilter, cityFilter, assignedData]);

  const csvData = (vehicleTypeFilter === "TRANSPORT" ? transportData : filteredData).map((data) => {
    if (vehicleTypeFilter === "TRANSPORT") {
      return {
        'Bike Name': data.vehicleName,
        'Bike No.': data.vehicleNo,
        'Weight': data.weight,
        'Insurance No': data.insuranceNo,
        'Top Speed': data.topSpeed,
        'RC Number': data.rc,
        'Date & Time': data.assignHubDate,
      };
    } else {
      return {
        'city': data.hub.city,
        'Vehicle No.': data.vehicleNo,
        'Hub Name': data.hub.hubName,
        'Vehicle Type': data.vehicleType,
        // Add more fields as needed
        'Date & Time': data.assignHubDate,
        'Manager Name': data.hub.managerName,
        'Vehicle Name': data.vehicleName,
      };
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (vehicleTypeFilter === "TRANSPORT" ? transportData : filteredData).slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const totalItems = vehicleTypeFilter === "TRANSPORT" ? transportData.length : filteredData.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
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
    <Flex>
      <Box mt={10} ml={10} width="100%">
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Box display="flex" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">
              Assigned Vehicle
            </Text>
          </Box>
          <Flex>
            <Select
              placeholder="Select vehicle type"
              width="200px"
              onChange={(e) => setVehicleTypeFilter(e.target.value)}
              mr="4"
            >
              <option value="FOUR_WHEELER">CAR</option>
              <option value="TWO_WHEELER">BIKE</option>
              <option value="TRANSPORT">Transport</option>
            </Select>
            <Select
              placeholder="Select city"
              width="200px"
              onChange={(e) => setcityFilter(e.target.value)}
              disabled={vehicleTypeFilter === "TRANSPORT"}
            >
              {citys.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </Select>
          </Flex>
          <CSVLink data={csvData} filename={"assigned_vehicles.csv"}>
            <Button colorScheme="teal">Download data</Button>
          </CSVLink>
        </Flex>
        <Box maxH="500px" overflowY="auto">
          <Table variant="simple" border="3px solid #13C39C">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                {vehicleTypeFilter === "TRANSPORT" ? (
                  <>
                    <Th>Bike Name</Th>
                    <Th>Bike No.</Th>
                    <Th>Manager Name</Th>
                    <Th>Insurance No</Th>
                    <Th>Top Speed</Th>
                    <Th>RC Number</Th>
                    <Th>Date and Time</Th>
                  </>
                ) : (
                  <>
                    <Th>city</Th>
                    <Th>Vehicle No.</Th>
                    <Th>Hub Name</Th>
                    <Th>Vehicle Type</Th>
                    <Th>Date & Time</Th>
                    <Th>Manager Name</Th>
                    <Th>Vehicle Name</Th>
                  </>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {currentData.map((data, index) => (
                <Tr key={index}>
                  <Td>{indexOfFirstItem + index + 1}</Td>
                  {vehicleTypeFilter === "TRANSPORT" ? (
                    <>
                      <Td>{data.vehicleName}</Td>
                      <Td>{data.vehicleNo}</Td>
                      <Td>{data.hub.managerName}</Td>
                      <Td>{data.insuranceNo}</Td>
                      <Td>{data.topSpeed}</Td>
                      <Td>{data.rc}</Td>
                      <Td>{data.assignHubDate}</Td>
                    </>
                  ) : (
                    <>
                      <Td>{data.hub.city}</Td>
                      <Td>{data.vehicleNo}</Td>
                      <Td>{data.hub.hubName}</Td>
                      <Td>{data.vehicleType}</Td>
                      <Td>{data.assignHubDate}</Td>
                      <Td>{data.hub.managerName}</Td>
                      <Td>{data.vehicleName}</Td>
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {renderPagination()}
      </Box>
    </Flex>
  );
};

export default AssignedVehicle;
