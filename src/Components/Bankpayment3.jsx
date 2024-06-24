import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Image,
  Text,
  Grid,
} from "@chakra-ui/react";


const PaymentOption = ({ label, isSelected, onClick }) => (
  <Flex gap={2}>
    <Button
      variant="unstyled"
      rounded="full"
      w="30px"
      h="30px"
      bg={isSelected ? "green.500" : "transparent"}
      borderWidth="1px"
      borderColor="neutral.400"
      _hover={{ bg: isSelected ? "green.600" : "neutral.100" }}
      onClick={onClick}
    />
    <Text
      className={
        isSelected
          ? "text-base font-medium leading-6 text-zinc-950"
          : "grow text-base font-medium leading-6 text-neutral-400"
      }
    >
      {label}
    </Text>
  </Flex>
);

function Bankpayment3() {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const paymentOptions = [
    {
      label: "Card",
      isSelected: selectedOption === 0,
      onClick: () => handleOptionClick(0),
    },
    {
      label: "Bank",
      isSelected: selectedOption === 1,
      onClick: () => handleOptionClick(1),
    },
    {
      label: "Transfer",
      isSelected: selectedOption === 2,
      onClick: () => handleOptionClick(2),
    },
  ];

  const SectionHeader = ({ children }) => (
    <Text className="text-2xl font-semibold tracking-tight leading-7 text-zinc-950 max-md:max-w-full">
      {children}
    </Text>
  );

  return (
   <>
   
   <Flex
      flex={5}
      maxW="full"
      flexDirection="column"
      maxMd={{ flexDirection: "column", gap: 0 }}
    >
      <Flex w="44%" maxMd={{ ml: 0, w: "full" }} flexDirection="column">
        <Box
          p={12}
          mt={20}
          rounded="lg"
          maxMd={{ px: 5, mt: 10, maxW: "full" }}
        >
          <Text className="text-2xl font-semibold tracking-tight leading-7 text-zinc-950 max-md:max-w-full">
            Payment
          </Text>
          <Divider mt={2} />
          <Text
            mt={9}
            fontSize="lg"
            fontWeight="semibold"
            leading="3"
            color="zinc.950"
          >
            Pay With:
          </Text>
          <Flex gap={5} mt={4}>
            {paymentOptions.map((option, index) => (
              <PaymentOption key={index} {...option} />
            ))}
          </Flex>

          <Box width={1150}>
            {/* <Grid
              templateColumns="1fr 1fr"
              gap={4}
              paddingTop={20}
              paddingLeft={2}
              // width={100}
            >
              <Input placeholder="Enter Account Number" />
            </Grid> */}
            <Box color={"black.100"} mt={10} ml={40}>
              <Text>Transfer Rs 49.80 to :</Text>
              <Text fontWeight="bold">Polaris Bank</Text>
              <Text fontWeight="bold">01235464584</Text>
            </Box>
          </Box>
          <Button
            mt={16}
            px={16}
            py={5}
            fontSize="base"
            fontWeight="bold"
            bgColor="green.500"
            color="zinc.100"
            maxMd={{ px: 5, mt: 10, maxW: "full" }}
          >
            Coinfirm Payment
          </Button>
          <Text mt={6} fontSize="sm" leading="6" color="neutral.400">
            Your personal data will be used to process, support your experience
            throughout this website, and for other purposes described in our
            privacy policy.
          </Text>
        </Box>
      </Flex>
      <Flex ml={5} marginLeft={670} w="56%" flexDirection="column">
        <Box
          flexGrow={1}
          justify="center"
          items="start"
          py={12}
          pr={16}
          pl={5}
          bg="gray.50"
          borderWidth="1px"
          borderColor="zinc.300"
          maxMd={{ pr: 5, mt: 5 }}
          mt={-550}
        >
          <Box p={12} mt={6} maxW="full" w="[593px]" maxMd={{ px: 5 }}>
            <SectionHeader>Payment Detail</SectionHeader>
            <Divider mt={2} />
            <Flex
              gap={4}
              justify="between"
              mt={9}
              fontWeight="medium"
              maxMd={{ flexWrap: "wrap", maxW: "full" }}
            >
              <Image
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ec2d05f0c8c6e70040bb612e93ccca83669cd9d67d5bff4396c76cbcc20793e?apiKey=6e819305aff14a71a524c5abb40332f8&"
                alt="Driver icon"
                className="w-16 aspect-[0.85]"
              />
              <Flex flex="1" self="start" flexDirection="column">
                <Flex gap={5} justify="between" fontSize="lg" color="zinc.950">
                  <Box flex="auto" lineHeight="122%">
                    Tushar Sahu
                  </Box>
                  <Box>₹49.80</Box>
                </Flex>
                <Text mt={1} fontSize="base" leading="3" color="neutral.400">
                  Driver Id: 123456
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap={4}
              justify="between"
              mt={20}
              fontSize="base"
              maxMd={{ flexWrap: "wrap", maxW: "full", mt: 10 }}
            >
              <Box
                flex="auto"
                p={3.5}
                bgColor="white"
                rounded="md"
                borderWidth="1.5px"
                borderColor="neutral.400"
                lineHeight="112.5%"
                color="neutral.400"
              >
                <Input placeholder="Incentive" />
              </Box>
              <Button
                p={3.5}
                fontWeight="medium"
                rounded="md"
                borderWidth="1.5px"
                bgColor="neutral.400"
                borderColor="neutral.400"
                lineHeight="75%"
                color="zinc.100"
              >
                Apply
              </Button>
            </Flex>
            <Flex
              gap={5}
              justify="between"
              mt={16}
              fontSize="base"
              fontWeight="medium"
              color="zinc.950"
              maxMd={{ flexWrap: "wrap", mt: 10, mr: 1.5 }}
            >
              <Box self="start" fontSize="base" lineHeight="3">
                Subtotal
              </Box>
              <Box flex="auto" fontSize="4xl" lineHeight="5">
                ₹49.80
              </Box>
            </Flex>
            <Flex
              gap={5}
              justify="between"
              mt={24}
              fontWeight="medium"
              color="zinc.950"
              maxMd={{ flexWrap: "wrap", mt: 10, mr: 1.5 }}
            >
              <Box self="start" fontSize="base" lineHeight="3">
                Total
              </Box>
              <Box flex="auto" fontSize="4xl" lineHeight="5">
                ₹49.28
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
   </>
  );
}

export default Bankpayment3;
