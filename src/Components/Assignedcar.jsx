import { useState, useEffect } from 'react';
import { FaBars, FaUserAlt, FaRegChartBar, FaThList, FaUser } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { NavLink } from 'react-router-dom';
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { FaCar } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";

const Assignedcar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [carData, setCarData] = useState([]);

    const demoData = [
        { sNo: 1, carName: "Toyota Corolla", carNumber: "ABC123", carType: "Sedan", Location: "Raipur", range: "500 km", driverName: "John Doe" },
        { sNo: 2, carName: "Honda Civic", carNumber: "XYZ456", carType: "Sedan", Location: "Raipur", range: "450 km", driverName: "Jane Smith" }
    ];


    return (
      <>
    
      <Flex direction="row" h="100vh">
           
            
           <Flex direction="column" flex="1">
               <Box position="relative"   w={{ base: "50%", md: "20%" }} h={{ base: "25px", md: "10px" }} p={4} bg="white"  mb={{ base: 4, md: 0 }} mt={{ base: 10, md: "10px"}} mr={{ base: 0, md: 10 }}>
                           <Text position="absolute" top="5px" left="50px" fontWeight="bold">Car Assigned to driver</Text>
                           <Icon as={IoChevronBack} position="absolute" top="8px"   left="5px" />
                           
                       </Box>
                         
                       <Box w="1000px" height="1000px" bg="white" borderRadius="10px"  border="1px solid black" borderColor="blue.200" marginTop="10px" marginLeft={{base:"none",md:"80px"}} overflowY="auto">
                   {/* Table */}
                   <Table variant="simple">
                       <Thead>
                           <Tr>
                           <Th style={{ background: "#355eef", color: "black" }}>S No.</Th>
               <Th style={{ background: "#355eef", color: "black" }}>Car Name</Th>
               <Th style={{ background: "#355eef", color: "black" }}>Car Number</Th>
               <Th style={{ background: "#355eef", color: "black" }}>Car Type</Th>
               <Th style={{ background: "#355eef", color: "black" }}>Location</Th>
               <Th style={{ background: "#355eef", color: "black" }}>Range</Th>
               <Th style={{ background: "#355eef", color: "black " }}>Driver Name</Th>
                           </Tr>
                       </Thead>
                       <Tbody>
                           {demoData.map((car, index) => (
                               <Tr key={index}>
                                   <Td>{car.sNo}</Td>
                                   <Td>{car.carName}</Td>
                                   <Td>{car.carNumber}</Td>
                                   <Td>{car.carType}</Td>
                                   <Td>{car.Location}</Td>
                                   <Td>{car.range}</Td>
                                   <Td>{car.driverName}</Td>
                               </Tr>
                           ))}
                       </Tbody>
                   </Table>
               </Box>
               
               <Box flex="1">
                   {children}
               </Box>
               
           </Flex>
       </Flex>
      </>
    );
};

export default Assignedcar;
