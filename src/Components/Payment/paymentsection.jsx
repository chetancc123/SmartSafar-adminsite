import { useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Flex, Box, Icon, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import { CSVLink } from "react-csv";

const Paymentsection = ({ children }) => {
return (
    <Flex direction="row" h="100vh">
      <Flex direction="column" flex="1">
        <Flex
          direction={{ base: "column", md: "row" }}
          ml={{ base: "none", md: "90px" }}
        >
          {/* Boxes 1 to 4 */}
          <Box
            position="relative"
            w={{ base: "50%", md: "85%" }}
            h={{ base: "25px", md: "150px" }}
            p={4}
            bg="white"
            boxShadow="md"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: 10 }}
            mr={{ base: 0, md: 4 }}
            borderRadius="10px"
            border="3px solid #13C39C"

          >
            <Text fontWeight={"bold"}>Employee payment</Text>
            <Text
              position="absolute"
              top="45px"
              left="105px"
              fontWeight="bold"
              fontSize={40}
            >
            </Text>
            <Link to={"/Employeepending"}>
              <Icon
                as={FaBars}
                position="absolute"
                color="blue"
                top="5px"
                right="5px"
              />
            </Link>
          </Box>
          {/* Box 2 */}
          <Box
            position="relative"
            w={{ base: "50%", md: "85%" }}
            h={{ base: "auto", md: "150px" }}
            p={4}
            bg="white"
            boxShadow="md"
            mb={{ base: 4, md: 0 }}
            mt={{ base: 10, md: 10 }}
            mr={{ base: 0, md: 4 }}
            borderRadius="10px"
            border="3px solid #13C39C"

          >
            <Text fontWeight={"Bold"}>Driver payment</Text>
            <Text
              position="absolute"
              top="45px"
              left="105px"
              fontWeight="bold"
              fontSize={40}
            >
            </Text>
            <Link to={"/Payment"}>
              <Icon as={FaUser} position="absolute" top="5px" right="5px" />
            </Link>
          </Box>
          {/* Box 3 */}
       </Flex>
        <Box flex="1">{children}</Box>
      </Flex>
    </Flex>
  );
};

export default Paymentsection;
