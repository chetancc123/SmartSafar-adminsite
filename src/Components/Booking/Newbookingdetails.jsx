import { useEffect, useState } from "react";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  Input,
  Box,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Home from "../Home";

const Newbookingdetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(false);
  const [data, setData] = useState([]);
  const [getDriver, setDriver] = useState([]);
  const toggleModal = (driver) => {
    setSelectedDriver(driver);
    setIsOpen(!isOpen);
  };

  const fetchAPIData = async () => {
    axios
      .get("http://localhost:8080/hub/bookingDetails/1")
      .then((data) => {
        const convertedData = data.data.map((item) => ({
          ...item,
          startDateTime: new Date(item.startDateTime).toLocaleString(),
          endDateTime: new Date(item.endDateTime).toLocaleString(),
        }));
        setData(convertedData);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAPIData();
  }, []);

  const fetchDriver = async () => {
    axios
      .get("http://localhost:8080/hub/driverAvailable")
      .then((data) => {
        setDriver(data.getDriver);
        console.log(getDriver);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDriver();
  }, []);

  return (
    <>
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px"
        px={[4, 6]}
      >
        <Text
          as="button"
          fontSize={30}
          fontWeight="bold"
          colorScheme="blue"
          mt={14}
          mr={514}
        >
          Booking Details
        </Text>
      </Flex>

      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px"
        px={[4, 6]}
      >
        <Flex
          bg="gray.100"
          p={6}
          borderRadius="md"
          boxShadow="md"
          mb={4}
          marginTop="600px"
          marginRight="40px"
          ml={{ base: "none", md: "10px" }}
          height="400px"
          width="800px"
          border="1px solid black"
          backgroundColor="white"
          flexDirection="column"
          py={5}
          pr={2}
          rounded="2xl"
          borderColor="blue.600"
          borderOpacity="0.8"
        >
          {" "}
          {data.map((item, index) => (
            <Box>
              <Flex paddingTop={1}>
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  fontFamily="Poppins, sans-serif"
                  color="black"
                >
                  Profile Picture
                </Text>
              </Flex>
              <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
                <Input
                  placeholder="User Name"
                  value={item.customerName}
                  readOnly
                />
                <Input
                  placeholder="Distance"
                  value={item.distancefrombooking}
                  readOnly
                />
              </Grid>
              <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
                <Input
                  placeholder="Time to Travel"
                  value={item.timetotravel}
                  readOnly
                />
                <Textarea
                  placeholder="Locality"
                  value={JSON.stringify(item.locality, null, 2)}
                  readOnly
                />
              </Grid>
              <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
                <Textarea
                  placeholder="Source to destination"
                  value={item.sourceOfDestination}
                  readOnly
                />

                <Input
                  placeholder="Payment Method"
                  value={item.paymentMethod}
                  readOnly
                />
              </Grid>
            </Box>
          ))}
          <Flex>
            <Box
              overflowY="auto"
              width="800px"
              border="1px solid green"
              borderRadius="md"
              ml={{ base: "none", md: "-30px" }}
              marginLeft="-35px"
              marginTop="150px"
            >
              <Text marginLeft={10} fontWeight="bold" fontSize={25}>
                Driver Available
              </Text>
              <Table variant="simple" mt={6} maxW="892px">
                <Thead>
                  <Tr>
                    <Th>Driver Name</Th>
                    <Th>Present Location</Th>
                    <Th>Distance from Booking</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.driverName} Raja</Td>
                      <Td>{item.locality.address}Raipur</Td>
                      <Td>{item.distance} 25</Td>
                      <Td>
                        <button
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            console.log(
                              "Detail button clicked for index:",
                              index
                            )
                          }
                        >
                          Details
                        </button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
          <Flex
            gap={5}
            justify="space-between"
            items="flex-end"
            px={1}
            w="full"
          >
            <Flex
              gap={1.5}
              alignSelf="center"
              px={1}
              mt={6}
              ml={-400}
              fontSize="sm"
              fontWeight="medium"
              color="gray.800"
            ></Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedDriver && (
              <>
                <img src="logo192.png" width="50px" height="50px" />
                <Text fontWeight="bold" marginLeft="130px" fontSize="18">
                  Success
                </Text>
                <Text fontWeight="bold">
                  You Have Successfully Assigned Driver For Ride{" "}
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green">Dashboard</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        w={isOpen ? "200px" : "50px"}
        bg="gray."
        overflowY="auto"
        transition="width 0.3s ease"
        flexShrink="0"
      ></Box>
    </>
  );
};

export default Newbookingdetails;
