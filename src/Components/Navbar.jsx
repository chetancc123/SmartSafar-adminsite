import React from "react";
import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from "@chakra-ui/react";
import { FaRegBell } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

const Navbar1 = ({ userData, email, handleLogout }) => {
  return (
    <Flex
      as="header"
      className="header"
      bg="#13C39C"
      justify="space-between"
      px={[2, 6]}
      py={[3, 4]}
      mb="0"
      position="fixed"
      top="0"
      zIndex="10"
      width="100%"
    >
      <Box fontSize="32px" fontWeight="500" fontFamily="Poppins, sans-serif" color="white">
        LOGO
      </Box>
      <Flex align="center" className="user-info">
        <Popover>
          <PopoverTrigger>
            <Icon as={FaRegBell} fontSize="33px" color="white" margin="3" cursor="pointer" />
          </PopoverTrigger>
          <PopoverContent color="black" border="1px solid" marginLeft="1000" w={{ base: "80%", md: "40%" }} h={{ base: "25px", md: "400px" }} marginTop="81" borderColor="gray.200" boxShadow="lg" p={4} borderRadius="md">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Notifications</PopoverHeader>
            <PopoverBody>
              {/* Notification content */}
              <Text>Notification 1</Text>
              <Text>Notification 2</Text>
              <Text>Notification 3</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {userData && (
          <>
            <img
              src={userData.profileImgLink}
              alt={userData.name}
              className="user-avatar"
              style={{ width: "53px", height: "53px", borderRadius: "50%" }}
            />
            <Box className="user-details" fontSize="12px" fontWeight="300" fontFamily="Lexend, sans-serif" color="white" ml={10}>
              {userData.name} <br /> {email}
            </Box>
          </>
        )}
        <Icon as={BiLogOutCircle} fontSize="25px" color="white" ml={5} cursor="pointer" onClick={handleLogout} />
      </Flex>
    </Flex>
  );
};

export default Navbar1;
