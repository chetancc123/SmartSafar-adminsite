import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import axios from "axios"; // Import axios here
import {
  Flex,
  Box,
  Icon,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";


const Todaynewbookinghistory = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [sortBy, setSortBy] = useState("newest"); // State variable for sorting

  const [data, setData] = useState([]);

  const fetchAPIData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/totalCompleteBooking/1"
      );
      const convertedData = response.data.map((item) => ({
        ...item,
        startDateTime: new Date(item.startDateTime).toLocaleString(),
        endDateTime: new Date(item.endDateTime).toLocaleString(),
      }));
      setData(convertedData);
      console.log(convertedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPIData();
  }, []);

  // Logic to calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Logic to calculate the index of the last item for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Logic to calculate the index of the first item for the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Logic to get the current items to be displayed
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page navigation
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggle = () => setIsOpen(!isOpen);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filtering logic based on search query
  const filteredData = data.filter((item) =>
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.tripFromBookingTime);
    const dateB = new Date(b.tripFromBookingTime);
    if (sortBy === "newest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return (
   <>
  
   <Flex direction="row" h="100vh">
      <Flex direction="column" flex="1">
        <Flex justify="space-between" p="10px" alignItems="center">
          <Button>
            <Icon as={IoChevronBack} />
          </Button>
          <Text fontWeight="bold" ml="-200px">
            Today's Booking History
          </Text>
          <Box>
            <InputGroup size="md" mt="20px" ml="-20px">
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Box>
          <Flex alignItems="center">
            <Select value={sortBy} onChange={handleSortChange} mr="10px">
              <option value="newest">Newesttttt to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </Select>
          </Flex>
        </Flex>

        <Box
          w={{ base: "100%", md: "80%" }}
          p={4}
          bg="gray.100"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          ml={{ base: 10, md: 10 }}
          overflowY="auto"
          border="1px solid red"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="blue">Customer Name</Th>
                <Th color="blue">Trip From Booking Time</Th>
                <Th color="blue">Trip To Reach Time</Th>
                <Th color="blue">Distance</Th>
                <Th color="blue">Assign Driver</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.customerName}</Td>
                  <Td>{item.startDateTime}</Td>
                  <Td>{item.endDateTime}</Td>
                  <Td>{item.driverName}Rupesh</Td>
                  <Td>{item.distance} 20km</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* Pagination */}
          <Flex justify="center" mt="2rem">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                mx="20"
                colorScheme={currentPage === i + 1 ? "red" : "gray"}
                onClick={() => handleClick(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </Flex>
        </Box>

        <Box flex="1">{children}</Box>
      </Flex>
    </Flex>
   </>
  );
};

export default Todaynewbookinghistory;
