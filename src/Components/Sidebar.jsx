import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { FaListCheck, FaCar } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Sidebar is open by default on larger screens

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      to: "/dashboard",
      name: "Dashboard",
      icon: IoMdHome,
    },
    {
      to: "/driverlist",
      name: "Driver List",
      icon: FaCar,
    },
    {
      to: "/Carlist",
      name: "VEHICLE LIST",
      icon: FaCar,
    },
    {
      to: "/Transport",
      name: "Courier Section",
      icon: FaCar,
    },
    {
      to: "/booking",
      name: "Booking",
      icon: FaListCheck,
    },
    {
      to: "/management",
      name: "Management",
      icon: IoPeopleSharp,
    },
    {
      to: "/setting",
      name: "Setting",
      icon: IoIosSettings,
    },
    {
      to: "/logout",
      name: "Logout",
      icon: BiLogOutCircle,
    },
  ];

  return (
    <Box
      w={isOpen ? "200px" : "50px"}
      bg="green.100"
      overflowY="auto"
      transition="width 0.3s ease"
      flexShrink="0"
      // position="fixed"
      height="100vh" // Corrected to 100vh for full viewport height
      mt={{ base: "none", md: "40px" }}
      
    >
      <Flex direction="column">
        <Box p="20px 10px" borderBottom="1px solid #ccc">
          <Box cursor="pointer" onClick={toggleSidebar}>
            <FaBars />
          </Box>
        </Box>
        {menuItem.map((item, index) => (
          <NavLink to={item.to} key={index} activeClassName="active">
            <Flex alignItems="center" p="15px 20px" textDecoration="none" _hover={{ bg: "#f5f5f5" }}>
              <Icon as={item.icon} mr={isOpen ? "15px" : "0"} />
              {isOpen && <Text>{item.name}</Text>}
            </Flex>
          </NavLink>
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
