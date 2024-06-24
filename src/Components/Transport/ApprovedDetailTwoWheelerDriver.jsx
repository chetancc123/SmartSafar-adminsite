import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Badge,
  Image,
  Heading,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FaAngleLeft } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import Home from "../Home";

const ApprovedDetailTwoWheelerDriver = () => {
  const [driverData, setDriverData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isPassbookModalOpen, setIsPassbookModalOpen] = useState(false);
  const [isLicenceModalOpen, setIsLicenceModalOpen] = useState(false);
  const [isRegisterCertificateModalOpen, setIsRegisterCertificateModalOpen] =
    useState(false);

  const { id } = useParams();

  const fetchDriverData = () => {
    axios
      .get(
        `http://localhost:8080/hub/getProfileApprovedForTwo/52/detailsById/${id}`
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

  useEffect(() => {
    fetchDriverData();
  }, [id]);

  console.log(driverData);
  const toggleModal = (modalName) => {
    switch (modalName) {
      case "insurance":
        setIsInsuranceModalOpen(!isInsuranceModalOpen);
        break;
      case "passbook":
        setIsPassbookModalOpen(!isPassbookModalOpen);
        break;
      case "licence":
        setIsLicenceModalOpen(!isLicenceModalOpen);
        break;
      case "registerCertificate":
        setIsRegisterCertificateModalOpen(!isRegisterCertificateModalOpen);
        break;
      default:
        break;
    }
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
                Transport Driver Detail
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
          justifyContent="center"
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
                  src={driverData.courierDriverImage}
                  alt="Profile Image"
                />
              </Box>
              <Badge colorScheme="orange" fontSize="sm">
                <Text marginLeft="3" fontWeight="700">
                  {driverData.status}
                </Text>
              </Badge>
            </Flex>
            <Stack spacing={2} mt={-16} alignItems="center">
              <Heading fontSize="40px" fontWeight="bold">
                {driverData.name}
              </Heading>
              <Text fontSize="lg" color="gray.500">
                Email: {driverData.email}
              </Text>
              <Text fontSize="lg" color="gray.500">
                Contact: {driverData.phoneNo}
              </Text>
            </Stack>
          </Box>
        </Box>
      </Flex>

      {/* Document Details */}
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
          <Flex align="center" justify="center">
            <Stack spacing={4}>
              {/* Insurance */}
              <Box>
                <Flex align="center">
                  <Text fontWeight="600">Insurance:</Text>
                  <Link onClick={() => toggleModal("insurance")}>
                    <Icon
                      as={IoDocumentOutline}
                      className="user-avatar"
                      fontSize="30px"
                      color="Black"
                    />
                  </Link>
                </Flex>
                <Modal
                  isOpen={isInsuranceModalOpen}
                  onClose={() => toggleModal("insurance")}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Insurance Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Image
                        src={driverData.insurance}
                        alt="Insurance Document"
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
              {/* Passbook */}
              <Box>
                <Flex align="center">
                  <Text fontWeight="600">Passbook:</Text>
                  <Link onClick={() => toggleModal("passbook")}>
                    <Icon
                      as={IoDocumentOutline}
                      className="user-avatar"
                      fontSize="30px"
                      color="Black"
                    />
                  </Link>
                </Flex>
                <Modal
                  isOpen={isPassbookModalOpen}
                  onClose={() => toggleModal("passbook")}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Passbook Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Image
                        src={driverData.passbook}
                        alt="Passbook Document"
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
              {/* License */}
              <Box>
                <Flex align="center">
                  <Text fontWeight="600">License:</Text>
                  <Link onClick={() => toggleModal("licence")}>
                    <Icon
                      as={IoDocumentOutline}
                      className="user-avatar"
                      fontSize="30px"
                      color="Black"
                    />
                  </Link>
                </Flex>
                <Modal
                  isOpen={isLicenceModalOpen}
                  onClose={() => toggleModal("licence")}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>License Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Image src={driverData.licence} alt="License Document" />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
              {/* Register Certificate */}
              <Box>
                <Flex align="center">
                  <Text fontWeight="600">Register Certificate:</Text>
                  <Link onClick={() => toggleModal("registerCertificate")}>
                    <Icon
                      as={IoDocumentOutline}
                      className="user-avatar"
                      fontSize="30px"
                      color="Black"
                    />
                  </Link>
                </Flex>
                <Modal
                  isOpen={isRegisterCertificateModalOpen}
                  onClose={() => toggleModal("registerCertificate")}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Register Certificate Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Image
                        src={driverData.registerCertificate}
                        alt="Register Certificate Document"
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </Stack>
            <Box marginLeft="210">
              <Box padding="2">
                <Flex align="center">
                  <Text fontWeight="600">Vehicle Type :</Text>
                  <Text marginLeft="4">{driverData.vehicleType}</Text>
                </Flex>
              </Box>
              <Box padding="2">
                <Flex align="center">
                  <Text fontWeight="600">Vehicles number :</Text>
                  <Text marginLeft="4">{driverData.vehicleNo}</Text>
                </Flex>
              </Box>
              <Box padding="2">
                <Flex align="center">
                  <Text fontWeight="600"> Weight :</Text>
                  <Text marginLeft="4"> {driverData.wieght} kg</Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default ApprovedDetailTwoWheelerDriver;
