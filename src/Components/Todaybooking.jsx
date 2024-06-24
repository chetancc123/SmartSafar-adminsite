import React, { useState } from "react";
import { FaCar, FaUserCircle, FaBars, FaSearch } from "react-icons/fa";
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { IoIosList, IoPeopleSharp } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import {
  Flex,
  Box,
  Icon,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Image,
  Td,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";


const Todaybookinghistory = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [sortBy, setSortBy] = useState("newest"); // State variable for sorting

  const demoData = [
    {
      customerName: "Jane Cooper",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "20Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Floyd Miles",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Ronald Richards",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Marvin McKinney",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Jerome Bell",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Kathryn Murphy",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Jacob Jones",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Kristin Watson",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Jane Cooper",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "20Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Floyd Miles",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Ronald Richards",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Marvin McKinney",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Jerome Bell",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Kathryn Murphy",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Jacob Jones",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    {
      customerName: "Kristin Watson",
      tripFrom: "Tattibandh, Raipur",
      tripTo: "Raipura, Raipur",
      distance: "6Km",
      dateTimeFrom: "27-02-2024 10:20AM",
      dateTimeTo: "27-02-2024 11:00AM",
    },
    // Add more data objects as needed
  ];

  // Logic to calculate total number of pages
  const totalPages = Math.ceil(demoData.length / itemsPerPage);

  // Logic to calculate the index of the last item for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Logic to calculate the index of the first item for the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Logic to get the current items to be displayed
  const currentItems = demoData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page navigation
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filtering logic based on search query
  const filteredData = demoData.filter((item) =>
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.tripFrom);
    const dateB = new Date(b.tripFrom);
    if (sortBy === "newest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return (
  <>
  
  <Flex direction="row" h="100vh">
      {/* <Box
        w={isOpen ? "200px" : "50px"}
        bg="gray.100"
        overflowY="auto"
        transition="width 0.3s ease"
        flexShrink="0"
      >
        <Flex direction="column">
          <Box p="20px" borderBottom="1px solid #ccc">
            <Box ml={isOpen ? "50px" : "0px"} cursor="pointer" onClick={toggle}>
              <FaBars />
            </Box>
          </Box>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} activeClassName="active">
              <Flex
                alignItems="center"
                p="15px 20px"
                textDecoration="none"
                _hover={{ bg: "#f5f5f5" }}
              >
                <Icon as={item.icon} mr="15px" />
                <Text display={isOpen ? "block" : "none"}>{item.name}</Text>
              </Flex>
            </NavLink>
          ))}
        </Flex>
      </Box> */}
      <Flex direction="column" flex="1">
        <Box
          w={{ base: "50%", md: "80%" }}
          p={4}
          bg="gray.100"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 1 }}
          marginLeft="200px"
          overflowY="auto"
          border="1px solid black"
        >
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
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
              </Select>
            </Flex>
          </Flex>

          <Box>
            <Image
              boxSize="50px"
              objectFit="cover"
              borderRadius="full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuZalQHobpGIprl1ur52WzrAB5FeRE_dR9OA&s"
              alt="// Image: Profile Picture 2;

"
            />
            <p>Photo by John Doe on Unsplash</p>
          </Box>

          <Flex direction={{ base: "column", md: "row" }}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Td gap="10px" color="blue">
                    Customer Name
                  </Td>
                  <Td gap="1px" color="blue">
                    tripFrom
                  </Td>
                  <Td gap="1px" color="blue">
                    tripTo
                  </Td>
                  <Td gap="1px" color="blue">
                    distance
                  </Td>
                  <Td gap="1px" color="blue">
                    dateTimeFrom
                  </Td>
                  <Td gap="1px" color="blue">
                    dateTimeTo
                  </Td>
                </Tr>
              </Thead>
              <Tbody>
                {sortedData.map((booking, index) => (
                  <Tr key={index}>
                    <Td>{booking.customerName}</Td>
                    <Td>{booking.tripFrom}</Td>
                    <Td>{booking.tripTo}</Td>
                    <Td>{booking.distance}</Td>
                    <Td>{booking.dateTimeFrom}</Td>
                    <Td>{booking.dateTimeTo}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
          {/* Pagination */}
        </Box>
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

        <Box flex="1">{children}</Box>
      </Flex>
    </Flex>
  </>
  );
};

export default Todaybookinghistory;
