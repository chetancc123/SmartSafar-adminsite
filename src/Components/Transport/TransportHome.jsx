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

const TransportHome1 = () => {
  const wheelers = [
    {
      title: "TWO WHEELER",
      imageSrc:
        "data:image/png;base64,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",
      to: "/ApprovedTwoWheelerTransportdriver",
    },
    {
      title: "FOUR WHEELER",
      imageSrc:
        "https://t3.ftcdn.net/jpg/06/14/98/38/360_F_614983898_vhqXoOmmUmSjIcSvQCFi5wpZMdHOBmcY.jpg",
      to: "/ApprovedFourWheelerTransportdriver",
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

export default TransportHome1;
