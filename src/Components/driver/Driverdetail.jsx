import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios library
import {
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FaAngleLeft, FaRegStar } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const Driverdetail = () => {
  const [driverData, setDriverData] = useState({});
  const [documentData, setDocumentData] = useState(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const { driverId } = useParams();

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hub/driver-data-details/${driverId}`
        );
        setDriverData(response.data);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    const fetchDriverDocumentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hub/driver-document-details/${driverId}`
        );
        setDocumentData(response.data);
      } catch (error) {
        console.error("Error fetching driver document details:", error);
      }
    };

    fetchDriverData();
    fetchDriverDocumentDetails();
  }, [driverId]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hub/driver-payment-history/${driverId}`
        );
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPaymentHistory();
  }, [driverId]);

  const toggleDocumentModal = () => {
    setIsDocumentModalOpen(!isDocumentModalOpen);
  };

  const toggleSignatureModal = () => {
    setIsSignatureModalOpen(!isSignatureModalOpen);
  };

  return (
    <>
      {/* Header */}
     
      <Flex>
        <Box marginLeft="3">
          <Box>
            <Icon
              as={FaAngleLeft}
              className="user-avatar"
              fontSize="33px"
              color="Black"
              margin="3"
            />
          </Box>
          <Box marginTop="-12" marginLeft="10" width="80">
            <NavLink to={"/Driverlist"}>
              <Text fontWeight="500" mr={50}>
                Driver Detail
              </Text>
            </NavLink>
          </Box>
        </Box>
        <Box ml={{ base: "none", md: "10px" }} width="1100"></Box>
      </Flex>

      {/* Driver Details */}
      <Flex>
        <Box
          position="relative"
          marginLeft="250"
          w={{ base: "80%", md: "80%" }}
          p={4}
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
          border="3px solid purple"
          ml={{ base: "none", md: "10px" }}
          justifyContent="center" // Align items horizontally in center
        >
          <Box>
            <Text fontSize="20" fontWeight="500">
              {driverData && driverData.name ? driverData.name : "Loading..."}
            </Text>

            <Box marginTop="1">
              {/* <Flex direction="row">
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
              </Flex> */}
            </Box>
            <Box marginTop="2">
              <Flex align="center" fontSize="10">
                <Text fontWeight="600">Email:</Text>
                <Text marginLeft="4">{driverData.email}</Text>
              </Flex>
            </Box>
            <Box marginTop="2">
              <Flex align="center" fontSize="10">
                <Text fontWeight="600">Contact NO:</Text>
                <Text marginLeft="4">{driverData.phoneNo}</Text>
              </Flex>
            </Box>
            <Flex marginTop="2" justifyContent="center">
              <Text fontWeight="600">Driver ID: {driverData.driverId}</Text>
            </Flex>
            <Flex marginTop="2">
              <Text fontWeight="700">Today total ride: </Text>
              <Text color="blue" fontWeight="900" marginLeft="2">
                {driverData.todayTotalRide}
              </Text>
            </Flex>
            <Flex marginTop="2">
              <Text fontWeight="700">Today's Earning: </Text>
              <Text color="blue" fontWeight="900" marginLeft="2">
                {driverData.totalEarning} Rs
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>

      {/* Document Information */}
      <Box ml={{ base: "none", md: "10px" }} marginBottom="-7" marginTop="5">
        <Text fontWeight="700">Document Information</Text>
      </Box>
      <Flex>
        <Box
          position="relative"
          marginLeft="250"
          w={{ base: "80%", md: "80%" }}
          p={4}
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
          border="3px solid green"
          ml={{ base: "none", md: "10px" }}
        >
          <Box>
            <Flex align="center">
              <Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Document Type:</Text>
                    <Text marginLeft="4">Driving License Document</Text>
                  </Flex>
                </Box>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Registraion No.:</Text>
                    <Text marginLeft="4">1234567898</Text>
                  </Flex>
                </Box>

                <Modal
                  isOpen={isDocumentModalOpen}
                  onClose={toggleDocumentModal}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <img src="p.png" alt="Document" />
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Modal
                  isOpen={isSignatureModalOpen}
                  onClose={toggleSignatureModal}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Signature</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <img src="sign.png" alt="Signature" />
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Signature:</Text>
                    <Link onClick={toggleSignatureModal}>
                      <Icon
                        as={IoDocumentOutline}
                        className="user-avatar"
                        fontSize="30px"
                        color="Black"
                      />
                    </Link>
                  </Flex>
                </Box>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Passbook:</Text>
                    <Link onClick={toggleDocumentModal}>
                      <Icon
                        as={IoDocumentOutline}
                        className="user-avatar"
                        fontSize="30px"
                        color="Black"
                      />
                    </Link>
                  </Flex>
                </Box>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Pan No.:</Text>
                    <Text marginLeft="4">ABCTY1234D</Text>
                  </Flex>
                </Box>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Address:</Text>
                    <Text marginLeft="4">Santoshi Nagar, Raipur </Text>
                  </Flex>
                </Box>
              </Box>
              <Box marginLeft="10">
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Date of Issue:</Text>
                    <Text marginLeft="4">June 17, 2003</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Date of Issue:</Text>
                    <Text marginLeft="4">June 24, 2025</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">UID No.</Text>
                    <Text marginLeft="4">1234567891012146</Text>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>

      {/* Payment & Previous ride */}
      <Box ml={{ base: "none", md: "10px" }} marginBottom="-7" marginTop="5">
        <Text fontWeight="700">Payment & Previous ride</Text>
      </Box>
      <Flex>
        <Box
          position="relative"
          marginLeft="250"
          w={{ base: "80%", md: "80%" }}
          h="250px"
          overflowY="auto"
          p={4}
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
          border="3px solid red"
          ml={{ base: "none", md: "10px" }}
        >
          {/* Payment history */}
          <Flex direction="column">
            <Text fontWeight="700" marginBottom="10px">
              Payment history
            </Text>
            {/* Display payment history */}
            {paymentHistory.map((payment, index) => (
              <Flex
                key={index}
                marginBottom="10px"
                flexDirection="row"
                color="black"
                mr="100px"
              >
                <Box marginRight="20px">
                  <Text>Date: {payment.localDate}</Text>
                </Box>
                <Box>
                  <Text>Total Earnings: {payment.totalEarning}</Text>
                </Box>
              </Flex>
            ))}
          </Flex>
          {/* Buttons */}
          <Flex
            flexDirection="row"
            gap="10px"
            position="absolute"
            bottom="20px"
            width="100%"
          >
            <Box
              border="3px solid green"
              borderRadius="10"
              width="fit-content"
              ml={700}
            >
              <Link>
                <Button>Booking History</Button>
              </Link>
            </Box>
            <Box border="3px solid blue" borderRadius="10" width="fit-content">
              <Link>
                <Button>Car History</Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Driverdetail;
