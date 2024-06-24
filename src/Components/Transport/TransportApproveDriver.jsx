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
   Image, Heading,  Stack,Badge ,Center
} from "@chakra-ui/react";
import { FaAngleLeft, FaRegStar } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Home from "../Home";
const TransportApproveDriver = () => {
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
              Transport Driver Details
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
   <Box p={8} maxWidth="1200px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Image
            borderRadius="full"
            boxSize="105px"
            src="data:image/jpeg;base64,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" // replace with your image URL
            alt="Profile Image"
          />
        </Box>
        <Badge colorScheme="orange" fontSize="sm">
          At ride
        </Badge>
      </Flex>
      <Center mt={-16}>
        <Stack spacing={2}>
          <Heading fontSize="40px" fontWeight="bold" mr={300}>
            Yashwant Dewangan
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Email - yashwantdewangan1234@gmail.com
          </Text>
          <Text fontSize="lg" color="gray.500" >
            Contact - 9424137362
          </Text>
        </Stack>
      </Center>
    </Box>
        </Box>
      </Flex>

      {/* Document Information */}
      <Box ml={{ base: "none", md: "10px" }} marginBottom="-7" marginTop="5">
        <Text fontWeight="700">Document Details</Text>
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
                 
                </Box>

                <Box padding="2">
                  
                </Box>


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
                    <Text fontWeight="600">Register Certificate :</Text>
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
                    <Text fontWeight="600">Vehicles Image :</Text>
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
                    <Text fontWeight="600">Driving License :</Text>
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
{/* insurance */}


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
                    <Text fontWeight="600">Insurance:</Text>
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

               

                
              </Box>
              <Box marginLeft="210">
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Date of Request  :</Text>
                    <Text marginLeft="4">June 17, 2003</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Registraion No :</Text>
                    <Text marginLeft="4">June 24, 2025</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Address :</Text>
                    <Text marginLeft="4">1234567891012146</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Pan No   :</Text>
                    <Text marginLeft="4">1234567891012146</Text>
                  </Flex>
                </Box>
              </Box>

              <Box marginLeft="210">
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Vehicle Type  :</Text>
                    <Text marginLeft="4"> 4 Wheelers</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Vehicles number :</Text>
                    <Text marginLeft="4">CG 07  7778</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600"> Weight :</Text>
                    <Text marginLeft="4">900 Kg</Text>
                  </Flex>
                </Box>
                
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>

     
    </>
  );
};

export default TransportApproveDriver;
