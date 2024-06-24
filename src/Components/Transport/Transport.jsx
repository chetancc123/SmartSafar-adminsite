import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { FaMixcloud, FaList, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Graph2 from "../Graph2";
import TransportBarChart from "./TransportBarchart";

const Transport = ({ children }) => {
  return (
    <>
      <Flex direction="column" h="100vh" p={4}>
        <Flex
          direction={{ base: "column", xl: "row" }}
          justify="space-between"
          alignItems={{ base: "center", xl: "flex-start" }}
          flexWrap="wrap"
        >
          {/* Boxes 1 to 5 */}
          <Box
            position="relative"
            w={{ base: "100%", md: "48%", xl: "19%" }}
            h={{ base: "auto", xl: "150px" }}
            p={4}
            bg="white"
            border="2px solid blue"
            boxShadow="md"
            mb={4}
            borderRadius="10px"
          >
            <Text position="absolute" top="5px" left="5px" fontWeight="bold">
              Request Driver’s List
            </Text>
            <Text
              position="absolute"
              top="45px"
              left="105px"
              fontWeight="bold"
              fontSize={40}
            >
              22
            </Text>
            <NavLink to={"/TransportRequestDriver"}>
              <Icon
                as={FaList}
                position="absolute"
                color="blue"
                top="5px"
                right="5px"
              />
            </NavLink>
          </Box>

          <Box
            position="relative"
            w={{ base: "100%", md: "48%", xl: "19%" }}
            h={{ base: "auto", xl: "150px" }}
            p={4}
            bg="white"
            border="2px solid blue"
            boxShadow="md"
            mb={4}
            borderRadius="10px"
          >
            <Text position="absolute" top="5px" left="5px" fontWeight="bold">
              Approved Driver’s List
            </Text>
            <Text
              position="absolute"
              top="45px"
              left="105px"
              fontWeight="bold"
              fontSize={40}
            >
              4
            </Text>
            <NavLink to={"/Approveddriverlisttransport"}>
              <Icon as={FaList} position="absolute" top="5px" right="5px" />
            </NavLink>
          </Box>

          <Box
            position="relative"
            w={{ base: "100%", md: "48%", xl: "19%" }}
            h={{ base: "auto", xl: "150px" }}
            p={4}
            bg="white"
            border="2px solid blue"
            boxShadow="md"
            mb={4}
            borderRadius="10px"
          >
            <Text position="absolute" top="5px" left="5px" fontWeight="bold">
              Add E-bike
            </Text>
            <NavLink to={"/Addebike"}>
              <Icon
                as={FaMixcloud}
                position="absolute"
                color="blue"
                top="5px"
                right="5px"
              />
            </NavLink>
          </Box>

          <Box
            position="relative"
            w={{ base: "100%", md: "48%", xl: "19%" }}
            h={{ base: "auto", xl: "150px" }}
            p={4}
            bg="white"
            border="2px solid blue"
            boxShadow="md"
            mb={4}
            borderRadius="10px"
          >
            <Text position="absolute" top="5px" left="5px" fontWeight="bold">
              GPS Tracker
            </Text>
            <NavLink to={"/Map1"}>
              <Icon
                as={FaMapMarkerAlt}
                position="absolute"
                color="blue"
                top="5px"
                right="5px"
              />
            </NavLink>
          </Box>

          <Box
            position="relative"
            w={{ base: "100%", md: "48%", xl: "19%" }}
            h={{ base: "auto", xl: "150px" }}
            p={4}
            bg="white"
            border="2px solid blue"
            boxShadow="md"
            mb={4}
            borderRadius="10px"
          >
            <Text position="absolute" top="5px" left="5px" fontWeight="bold">
              Assign E-bike
            </Text>
            <NavLink to={"/Addebike"}>
              <Icon
                as={FaMapMarkerAlt}
                position="absolute"
                color="blue"
                top="5px"
                right="5px"
              />
            </NavLink>
          </Box>
        </Flex>

        <Flex
          direction={{ base: "column", xl: "row" }}
          justify="space-between"
          mt={4}
        >
          <Box
            w={{ base: "100%", xl: "50%" }}
            mb={{ base: 4, xl: 0 }}
            marginLeft={"-57%"}
            mt={"24%"}
          >
            <TransportBarChart />
          </Box>

          <Box
            w={{ base: "100%", xl: "50%" }}
            p={4}
            bg="gray.100"
            boxShadow="md"
            border="2px solid blue"
            borderRadius="10px"
            overflowY="auto"
            h="450px"
          >
            <Graph2 />
          </Box>
        </Flex>

        <Box flex="1" mt={4}>
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default Transport;
