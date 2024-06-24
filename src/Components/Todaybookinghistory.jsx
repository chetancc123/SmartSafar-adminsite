import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
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
import axios from "axios";

const Todaybookinghistory = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [sortBy, setSortBy] = useState("newest"); // State variable for sorting
  const [data, setData] = useState([]);

  const fetchAPIData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hub/todaysBookingHistory/1"
      );
      const convertedData = response.data.map((item) => ({
        ...item,
        startDateTime: new Date(item.startDateTime).toLocaleString(),
        endDateTime: new Date(item.endDateTime).toLocaleString(),
      }));
      setData(convertedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPIData();
  }, []);
  console.log(data);
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

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <Flex direction="column" h="100vh" w={"100%"} m={"auto"}>
        <Flex justify="space-between" p="10px" alignItems="center">
          <Button>
            <Icon as={IoChevronBack} />
          </Button>
          <Text fontWeight="bold">Today's Booking History</Text>
          <InputGroup size="md">
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
          <Flex alignItems="center">
            <Select value={sortBy} onChange={handleSortChange} mr="10px">
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </Select>
          </Flex>
        </Flex>

        <Box
          w={{ base: "100%", md: "80%" }}
          p={4}
          bg="gray.100"
          boxShadow="md"
          mt={10}
          ml={{ base: "none", md: "120px" }}
          overflowY="auto"
          border="1px solid black"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="blue">Customer Name</Th>
                <Th color="blue">Trip From</Th>
                <Th color="blue">Trip To</Th>
                <Th color="blue">Driver Assigned</Th>
                <Th color="blue">Distance</Th>
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
    </>
  );
};

export default Todaybookinghistory;
