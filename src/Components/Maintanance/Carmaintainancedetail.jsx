import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Image,
  Button,
  ChakraProvider,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Carmaintainancedetail = () => {
  const [carData, setCarData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [damageCarVideos, setDamageCarVideos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { carRepairId } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchCarRepairById = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/admin/acceptedCarRepairs/${carRepairId}`,
        headers: {},
      };

      try {
        const response = await axios.request(config);
        const data = response.data;
        setCarData(data);
        setDamageCarVideos(data.damageCarVideo ? [data.damageCarVideo] : []);
      } catch (error) {
        console.error("Error fetching car repair details:", error);
      }
    };

    fetchCarRepairById();
  }, [carRepairId]);

  const handleApprove = async () => {
    const data = new FormData();
    data.append("maintenanceApprovalStatus", "APPROVE");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/admin/carRepairAccepted/${carRepairId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("Car repair approved successfully", response.data);
      toast({
        title: "Success",
        description: "Car repair approved successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error approving car repair: ", error);
      toast({
        title: "Error",
        description: "Error approving car repair",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReject = async () => {
    const data = new FormData();
    data.append("maintenanceApprovalStatus", "REJECT");

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/admin/carRepairRejected/${carRepairId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("Car repair rejected successfully", response.data);
      toast({
        title: "Success",
        description: "Car repair rejected successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error rejecting car repair: ", error);
      toast({
        title: "Error",
        description: "Error rejecting car repair",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    onOpen();
  };

  const imageUrls = carData.damageCarImg ? carData.damageCarImg.split(",") : [];

  return (
    <>
      <Flex>
        <Box marginLeft="3" mt={5}>
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
                Active Manager Detail
              </Text>
            </NavLink>
          </Box>
        </Box>
        <Box ml={{ base: "none", md: "10px" }} width="1100"></Box>
      </Flex>

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
          ml={{ base: "none", md: "10px" }}
          justifyContent="center"
        >
          <Box>
            <Box marginTop="2">
              <Flex marginTop="2">
                <Text fontWeight="700" marginBottom="10px">
                  Model Name: {carData.vehicleName}
                </Text>
              </Flex>
            </Box>
            <Box marginTop="2">
              <Flex marginTop="2">
                <Text fontWeight="700" marginBottom="10px">
                  Vehicle Number: {carData.vehicleNo}
                </Text>
              </Flex>
            </Box>
            <Flex marginTop="2">
              <Text fontWeight="700" marginBottom="10px">
                Chasis Number: {carData.chassisNo}
              </Text>
            </Flex>
            <Flex marginTop="2">
              <Text fontWeight="700" marginBottom="10px">
                Problem: {carData.message}
              </Text>
            </Flex>
            <Flex marginTop="2">
              <Text fontWeight="700" marginBottom="10px">
                Total Earnings: {carData.totalEarning}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>

      <Flex wrap="wrap" justifyContent="center">
        {imageUrls.map((url, index) => (
          <Box
            key={index}
            position="relative"
            w={{ base: "40%", md: "20%" }}
            p={2}
            height={"20vh"}
            bg="white"
            boxShadow="md"
            mb={4}
            mt={4}
            mr={2}
            ml={2}
            borderRadius="10px"
            border="3px solid purple"
            cursor="pointer"
            onClick={() => handleImageClick(url)}
          >
            <Image
              src={url}
              alt={`Car Damage ${index + 1}`}
              objectFit="cover"
              borderRadius="10px"
              height="100%"
              width="100%"
            />
          </Box>
        ))}
      </Flex>

      <Box mt={10} ml={10} mr={10}>
        <Text fontWeight="700" mb={4}>
          Damage Car Videos
        </Text>
        <Flex wrap="wrap" justifyContent="center">
          {damageCarVideos.map((videoUrl, index) => (
            <Box
              key={index}
              position="relative"
              w={{ base: "80%", md: "45%" }}
              p={2}
              height={"30vh"}
              bg="white"
              boxShadow="md"
              mb={4}
              borderRadius="10px"
              border="3px solid purple"
            >
              <video
                src={videoUrl}
                controls
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            </Box>
          ))}
        </Flex>
      </Box>

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
          <Button colorScheme="red" mt={50} onClick={handleReject}>
            Reject
          </Button>
        </ButtonGroup>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Image
                src={selectedImage}
                alt="Selected Car Damage"
                objectFit="cover"
                borderRadius="10px"
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  );
};

export default Carmaintainancedetail;
