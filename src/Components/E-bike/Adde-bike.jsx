import React, { useEffect, useState } from "react";

import { ChevronLeftIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  Button,
  Input,
  VStack,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  Select,
} from "@chakra-ui/react";


function Addebike() {
  const [file, setFile] = useState(null);
  const [carData, setCarData] = useState({
    vehicleName: "",
    price: "",
    battery: "",
    chargingTime: "",
    seatingCapacity: "",
    transmissionTypo: "",
    vehicleType: "",
    vehicleNo: "",
    insuranceNo: "",
    pricePerKm: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleImg", file);
    formData.append("VehicleDataDto", JSON.stringify(carData)); // Append car data as a string

    try {
      const response = await axios.post(
        "http://localhost:8080/hub/add-new-car/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data successfully submitted:", response.data);
      setShowSuccessMessage(true);
      onOpen();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
  <>

  <VStack spacing={4} alignItems="center" mt={10}>
      <Button color="red" mr="550px">
        <Text fontSize="3xl" fontWeight="medium" color="black">
          <ChevronLeftIcon w={10} h={12} color="black" mt="-8px" />
          Add E-bike
        </Text>
      </Button>
      <form onSubmit={handleSubmit}>
        <Flex
          direction="column"
          alignItems="center"
          px={16}
          pt={9}
          pb={20}
          mt={6}
          maxW={{ base: "full", md: "451px" }}
          bg="white"
          rounded="xl"
          borderWidth={2}
          borderColor="black"
          borderStyle="dashed"
          ml="180px"
        >
          <FormControl>
            <Input
              type="file"
              accept="image/jpeg"
              onChange={handleFileChange}
              display="none"
              id="file-upload"
            />
          </FormControl>
          <label htmlFor="file-upload">
            <Image
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c185950d5da433bc2d7b7016dc72f8620024c82ff087c31d27f2aca8d3c01557?apiKey=6e819305aff14a71a524c5abb40332f8&"
              alt="Upload Car Image"
              mb={6}
              maxW="full"
              borderWidth={2}
              borderColor="blue.600"
              borderStyle="solid"
              aspectRatio={1.82}
              fill="zinc.300"
              stroke="blue.600"
              strokeWidth="1.56px"
              w="150px"
            />
          </label>
          <FormControl>
            <Input
              type="file"
              accept="image/jpeg"
              onChange={handleFileChange}
              display="none"
              id="file-upload"
            />
          </FormControl>
        </Flex>

        <Flex direction="column" gap={4} w="100%" mt="50px">
          <Flex justify="space-between">
            <FormControl direction="row" display="flex">
              <FormLabel width="120px">Ebike  Name</FormLabel>
              <Input
                name="vehicleName"
                placeholder="New car"
                style={{ width: "60%" }}
                value={carData.vehicleName}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="170px">Charging Time</FormLabel>
              <Input
                name="chargingTime"
                placeholder="Charging Time"
                style={{ width: "80%" }}
                value={carData.chargingTime}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Flex justify="space-between">
            <FormControl direction="row" display="flex">
              <FormLabel width="120px">Ebike Type</FormLabel>
              <Input
                name="vehicleType"
                placeholder="Car Type"
                style={{ width: "60%" }}
                value={carData.vehicleType}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="200px">Seating Capacity</FormLabel>
              <Input
                name="seatingCapacity"
                placeholder="Seating Capacity"
                style={{ width: "90%" }}
                value={carData.seatingCapacity}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Flex justify="space-between">
            <FormControl direction="row" display="flex">
              <FormLabel width="120px">price</FormLabel>
              <Input
                name="price"
                placeholder="price"
                style={{ width: "60%" }}
                value={carData.price}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="180px">Transmission Typo</FormLabel>
              <Input
                name="transmissionTypo"
                placeholder="Transmission Typo"
                style={{ width: "80%" }}
                value={carData.transmissionTypo}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Flex justify="space-between">
            <FormControl direction="row" display="flex">
              <FormLabel width="120px">battery</FormLabel>
              <Input
                name="battery"
                placeholder="battery"
                style={{ width: "60%" }}
                value={carData.battery}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="180px">InsuranceNo</FormLabel>
              <Input
                name="insuranceNo"
                placeholder="insuranceNo"
                style={{ width: "80%" }}
                value={carData.insuranceNo}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Flex justify="space-between">
            <FormControl direction="row" display="flex">
              <FormLabel width="120px">Vehicle Number</FormLabel>
              <Input
                name="vehicleNo"
                placeholder="Vehicle Number"
                style={{ width: "30%" }}
                value={carData.vehicleNo}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="120px">pricePerKm</FormLabel>
              <Input
                name="pricePerKm"
                placeholder="pricePerKm"
                style={{ width: "80%" }}
                value={carData.pricePerKm}
                onChange={handleChange}
                // onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Flex justify="space-between">
            <FormControl direction="row" display="flex">
              <FormLabel width="120px">Vehicle service Type</FormLabel>
              <Select
                name="vehicleServiceType" // Corrected name attribute
                placeholder="vehicleServiceType"
                style={{ width: "100%" }}
                value={carData.vehicleServiceType}
                onChange={handleChange}
              >
                <option value="PREMIUM">PREMIUM</option>
              </Select>
            </FormControl>
          </Flex>
        </Flex>
        <Flex direction="row" mt="50px">
          <Box ml="330px">
            <Button
              type="Submit"
              colorScheme="blue"
              mr="20px"
              fontSize="20px"
              w="250px"
            >
              {" "}
              ADD
            </Button>
          </Box>
        </Flex>
      </form>
      <Flex direction="row" gap={30} paddingTop={10}>
        <Modal
          isOpen={showSuccessMessage}
          onClose={() => setShowSuccessMessage(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Succesfully added new car!</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => setShowSuccessMessage(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </VStack>
  </>
  );
}
export default Addebike;
