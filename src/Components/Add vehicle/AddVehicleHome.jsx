import React from "react";
import { Box, Flex, Heading, Badge, Image } from "@chakra-ui/react";
import { px } from "framer-motion";
import { NavLink } from "react-router-dom";
import Home from "../Home";

const Wheeler = ({ title, imageSrc, to }) => {
  return (
    <>
      <NavLink to={to} style={{ textDecoration: "none" }}>
        <Box
          className="grow"
          justifyContent="center"
          alignItems="start"
          pt={28}
          pr={16}
          pb={20}
          pl={28}
          w="full"
          fontSize="base"
          fontWeight="light"
          color="black"
          rounded="3xl"
          bg="zinc.300"
          maxW="full"
          maxMd={{ pr: 5, pl: 8, mt: 2 }}
        >
          <Box p={6} rounded="md" overflow="hidden">
            <Image src={imageSrc} alt={title} w="90%" h="200" />
          </Box>
          <Box mt={4} textAlign="center">
            {title}
          </Box>
        </Box>
      </NavLink>
    </>
  );
};

const AddVehicleHome = () => {
  const wheelers = [
    {
      title: "ADD TRANSPORT VEHICLE",
      imageSrc:
        "https://www.financialexpress.com/wp-content/uploads/2020/06/eBikeGo-Electric-Bicycle-rental.jpg",
      to: "/Addebike",
    },
    {
      title: "ADD VEHICLE BIKE AND CAR",
      imageSrc:
        "data:image/jpeg;base64,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",
      to: "/Addcar1",
    },
  ];

  return (
    <Flex
      direction="column"
      py={20}
      pr={2.5}
      pl={20}
      bg="white"
      maxMd={{ pl: 5 }}
      mt={-200} // Adjusted margin to move components up
    >
      <Flex
        className="header"
        gap={5}
        alignSelf="end"
        px={9}
        py={6}
        mt={24}
        fontWeight="semibold"
        rounded="3xl"
        shadow="sm"
        bg="zinc.100"
        maxMd={{ flexWrap: "wrap", px: 5, mt: 10 }}
      >
        <Badge
          justifyContent="center"
          alignItems="center"
          px={2.5}
          fontSize="base"
          color="white"
          rounded="full"
          bg="stone.500"
          h="33px"
          w="33px"
        >
          15
        </Badge>
      </Flex>
      <Box
        className="main"
        alignSelf="center"
        mt={32}
        w="full"
        maxW="1224px"
        maxMd={{ mt: 10, maxW: "full" }}
      >
        <Flex gap={5} maxMd={{ direction: "column", gap: 0 }}>
          {wheelers.map((wheeler, index) => (
            <Box
              key={index}
              className={`w-6/12 max-md:ml-0 ${index === 1 ? "ml-5" : ""}`}
              mt={-40} // Adjusted margin to move components up
            >
              <Wheeler
                title={wheeler.title}
                imageSrc={wheeler.imageSrc}
                to={wheeler.to}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default AddVehicleHome;
