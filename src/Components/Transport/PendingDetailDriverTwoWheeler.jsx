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
  Image,
  Heading,
  Stack,
  Badge,
  ChakraProvider,
  Center,
  ButtonGroup,
  useStepperStyles,
} from "@chakra-ui/react";
import { FaAngleLeft, FaRegStar } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const PendingDetailDriverTwoWheeler = () => {
  const [driverData, setDriverData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [isInsuranceModalOpen, setisInsuranceModalOpen] = useState(false);
  const [ispassbookModalOpen, setispassbookModalOpen] = useState(false);
  const [isLicenceModalopen, setisLicenceModalopen] = useState(false);
  const [registerCertificate, setregisterCertificate] = useState(false);

  const { id } = useParams();
  console.log(id);

  const fetchDriverData = () => {
    axios
      .get(
        `http://localhost:8080/hub/getProfilePendingForTwo/52/detailsById/${id}`
      )
      .then((response) => {
        if (response.data && response.data.success) {
          setDriverData(response.data.data); // Set driver data
        } else {
          console.error(
            "No data received from the API or API request unsuccessful"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching driver data: ", error);
      });
  };

  // Fetch driver data on component mount
  useEffect(() => {
    fetchDriverData();
  }, []);

  const toggleInsuranceModal = () => {
    setisInsuranceModalOpen(!isInsuranceModalOpen);
  };

  const togglepassbookModal = () => {
    setispassbookModalOpen(!ispassbookModalOpen);
  };

  const toggleLicenseModal = () => {
    setisLicenceModalopen(!isLicenceModalopen);
  };

  const toggleregisterCertificateModal = () => {
    setregisterCertificate(!registerCertificate);
  };

  const handleApprove = () => {
    const config = {
      method: "post",
      url: `http://localhost:8080/hub/courierdrivere/1/approved/${id}`,
    };

    axios(config)
      .then((response) => {
        console.log("Driver approved successfully");
        // You might want to update UI or perform other actions upon successful approval
      })
      .catch((error) => {
        console.error("Error approving driver: ", error);
      });
  };
  const handleReject = () => {
    const config = {
      method: "post",
      url: `http://localhost:8080/hub/courierdrivere/1/reject/${id}`,
    };

    axios(config)
      .then((response) => {
        console.log("Driver rejected successfully");
      })
      .catch((error) => {
        console.error("Error rejecting driver: ", error);
      });
  };
  console.log();
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
          <Box
            p={8}
            maxWidth="1200px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Image
                  borderRadius="full"
                  boxSize="105px"
                  src={driverData.courierDriverImage} // replace with your image URL
                  alt="Profile Image"
                />
              </Box>
              <Badge colorScheme="orange" fontSize="sm">
                <Text marginLeft="3" fontWeight="700">
                  {driverData.status}
                </Text>
              </Badge>
            </Flex>
            <Center mt={-16}>
              <Stack spacing={2}>
                <Heading fontSize="40px" fontWeight="bold" mr={300}>
                  {driverData.name}
                </Heading>
                <Text fontSize="lg" color="gray.500">
                  Email - {driverData.email} {/* Fixed email access */}
                </Text>
                <Text fontSize="lg" color="gray.500">
                  Contact - {driverData.phoneNo}
                </Text>
              </Stack>
            </Center>
          </Box>
        </Box>
      </Flex>

      {/* Document Details */}
      {/* Remaining document details code... */}
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
                <Box padding="2"></Box>

                <Box padding="2"></Box>
                {/*  insurance modal  */}
                <Modal
                  isOpen={isInsuranceModalOpen}
                  onClose={toggleInsuranceModal}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Insurance</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <img
                        src={driverData.insurance}
                        alt="Insurance Document"
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Insurance:</Text>
                    <Link onClick={toggleInsuranceModal}>
                      <Icon
                        as={IoDocumentOutline}
                        className="user-avatar"
                        fontSize="30px"
                        color="Black"
                      />
                    </Link>
                  </Flex>
                </Box>

                {/* passbook modal */}
                <Modal
                  isOpen={ispassbookModalOpen}
                  onClose={togglepassbookModal}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>passbook</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <img src={driverData.passbook} alt="passbook Document" />
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">passbook:</Text>
                    <Link onClick={togglepassbookModal}>
                      <Icon
                        as={IoDocumentOutline}
                        className="user-avatar"
                        fontSize="30px"
                        color="Black"
                      />
                    </Link>
                  </Flex>
                </Box>
                {/* license modal */}
                <Modal isOpen={isLicenceModalopen} onClose={toggleLicenseModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>License</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <img src={driverData.licence} alt="license" />
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">license:</Text>
                    <Link onClick={toggleLicenseModal}>
                      <Icon
                        as={IoDocumentOutline}
                        className="user-avatar"
                        fontSize="30px"
                        color="Black"
                      />
                    </Link>
                  </Flex>
                </Box>
                {/* register modal */}
                <Modal
                  isOpen={registerCertificate}
                  onClose={toggleregisterCertificateModal}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Register Certificate</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <img
                        src={driverData.registerCertificate}
                        alt="registerCertificate "
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Register Certificate:</Text>
                    <Link onClick={toggleregisterCertificateModal}>
                      <Icon
                        as={IoDocumentOutline}
                        className="user-avatar"
                        fontSize="30px"
                        color="Black"
                      />
                    </Link>
                  </Flex>
                </Box>
                {/* vehicle image modal */}
              </Box>

              <Box marginLeft="210">
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Vehicle Type :</Text>
                    <Text marginLeft="4"> 4 Wheelers</Text>
                  </Flex>
                </Box>
                <Box padding="2">
                  <Flex align="center">
                    <Text fontWeight="600">Vehicles number :</Text>
                    <Text marginLeft="4">CG 07 7778</Text>
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
      <ChakraProvider>
        <ButtonGroup>
          <Button
            colorScheme="green"
            ml={500}
            mr={40}
            mt={50}
            onClick={handleApprove}
          >
            Accept
          </Button>
          {/* You need to add onClick event for "Reject" button too */}
          <Button colorScheme="red" mt={50} onClick={handleReject}>
            Reject
          </Button>
        </ButtonGroup>
      </ChakraProvider>
    </>
  );
};

export default PendingDetailDriverTwoWheeler;
