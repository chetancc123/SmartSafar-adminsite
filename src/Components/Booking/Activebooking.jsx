import React, { useState } from 'react';
import { FaCar, FaUserCircle, FaBars, FaSearch } from "react-icons/fa";
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { IoIosList, IoPeopleSharp } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { Flex, Box, Icon, Text, Table, Thead, Tbody, Tr, Th, Td, Button, Select, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";


const Activebooking = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [bookingData, setBookingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [sortBy, setSortBy] = useState("newest"); // State variable for sorting

    const demoData = [
        {
            customerName: "dohn Doe",
            tripFrom: "New York, USA - 2024-03-03 10:00 AM",
            tripTo: "Los Angeles, USA - 2024-03-04 12:00 PM",
            distance: "50 km",
            driverAssigned: "Driver 1"
        },
        {
            customerName: "cane Smith",
            tripFrom: "San Francisco, USA - 2024-03-03 11:30 AM",
            tripTo: "Las Vegas, USA - 2024-03-04 01:30 PM",
            distance: "40 km",
            driverAssigned: "Driver 2"
        },
        {
            customerName: "bohn Doe",
            tripFrom: "New York, USA - 2024-03-03 10:00 AM",
            tripTo: "Los Angeles, USA - 2024-03-04 12:00 PM",
            distance: "50 km",
            driverAssigned: "Driver 1"
        },
        {
            customerName: "aane Smith",
            tripFrom: "San Francisco, USA - 2024-03-03 11:30 AM",
            tripTo: "Las Vegas, USA - 2024-03-04 01:30 PM",
            distance: "40 km",
            driverAssigned: "Driver 2"
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
    const filteredData = demoData.filter(item =>
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
           
           <Flex direction="column" flex="1">
               

               <Flex justify="space-between" p="10px" alignItems="center">
                   <Button>
                       <Icon as={IoChevronBack} />
                   </Button>
                   <Text fontWeight="bold" ml="-200px">Active Booking</Text>
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

               <Box
                   w={{ base: "50%", md: "80%" }}
                   p={4}
                   bg="gray.100"
                   boxShadow="md"
                   mb={{ base: 4, md: 0 }}
                   mt={{ base: 10, md: 10 }}
                   ml={{base:"none",md:"50px"}}
                   overflowY="auto"
                   border="1px solid black"
               >
                    <Flex direction={{ base: "column", md: "row" }}>
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
                           {sortedData.map((booking, index) => (
                               <Tr key={index}>
                                   <Td>{booking.customerName}</Td>
                                   <Td>{booking.tripFrom}</Td>
                                   <Td>{booking.tripTo}</Td>
                                   <Td>{booking.driverAssigned}</Td>
                                   <Td>{booking.distance}</Td>
                               </Tr>
                           ))}
                       </Tbody>
                   </Table>
                    </Flex>
                  
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
               
               <Box flex="1">
                   {children}
               </Box>
           </Flex>
       </Flex>
       </>
    );
};

export default Activebooking;
