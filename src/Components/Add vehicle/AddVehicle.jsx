import React, { useState, useRef } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FaUpload } from "react-icons/fa";

function AddVehicle() {
  const [files, setFiles] = useState([]); // Multiple files for images
  const [invoiceFile, setInvoiceFile] = useState(null); // Single file for invoice image
  const [carData, setCarData] = useState({
    vehicleName: "",
    price: "",
    distance: "",
    chassisNo: "",
    seatingCapacity: "",
    vehicleServiceType: "",
    vehicleNo: "",
    insuranceNo: "",
    pricePerKm: "",
    vehicleType: "",
    vehiclerange: "",
    dateOfPurchase: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]); // Multiple previews
  const [invoicePreview, setInvoicePreview] = useState(null);
  const adminId = sessionStorage.getItem('id'); // Correct sessionStorage key
  const imageInputRef = useRef(null);
  const invoiceInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleInvoiceChange = (e) => {
    const file = e.target.files[0];
    setInvoiceFile(file);
    setInvoicePreview(URL.createObjectURL(file));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    files.forEach((file) => {
      data.append('vehicleImg', file);
    });
    data.append('VehicleDataDto', JSON.stringify(carData));
    if (invoiceFile) {
      data.append('invoice', invoiceFile);
    }

    const config = {
      method: 'post',
      url: `http://localhost:8080/admin/add-new-Vehicle/${adminId}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      setShowSuccessMessage(true);
      onOpen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <VStack spacing={4} alignItems="center" mt={10}>
        <Button colorScheme="green" mr="550px">
          <Text fontSize="3xl" fontWeight="medium" color="black">
            Add Vehicle
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
            maxW={{ base: "full", md: "100%" }}
            bg="white"
            rounded="xl"
            borderWidth={2}
            borderColor="black"
            borderStyle="dashed"
            ml="10px"
          >
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                multiple
                display="none"
                ref={imageInputRef}
                onChange={handleFileChange}
              />
              <Button
                onClick={() => imageInputRef.current.click()}
                leftIcon={<FaUpload />}
                colorScheme="blue"
                variant="outline"
              >
                Upload Images
              </Button>
            </FormControl>
            {imagePreviews.map((preview, index) => (
              <Box key={index} position="relative">
                <Image
                  src={preview}
                  alt={`Selected Image ${index + 1}`}
                  mb={6}
                  maxW="full"
                  borderWidth={2}
                  borderColor="blue.600"
                  borderStyle="solid"
                  aspectRatio={1.82}
                  fill="zinc.300"
                  stroke="blue.600"
                  strokeWidth="1.56px"
                  w="120px"
                  mr={4}
                />
                <IconButton
                  aria-label="Remove image"
                  icon={<MinusIcon />}
                  size="sm"
                  colorScheme="red"
                  position="absolute"
                  top="0"
                  right="0"
                  onClick={() => handleRemoveImage(index)}
                />
              </Box>
            ))}
          </Flex>

          <Flex direction="column" gap={4} w="100%" mt="50px">
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Car name</FormLabel>
              <Input
                name="vehicleName"
                placeholder="New car"
                style={{ width: "100%" }}
                value={carData.vehicleName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Chassis number</FormLabel>
              <Input
                name="chassisNo"
                placeholder="Enter Chassis Number"
                style={{ width: "100%" }}
                value={carData.chassisNo}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="580px">Vehicle Type</FormLabel>
              <Select
                name="vehicleType"
                placeholder="Select Vehicle Type"
                style={{ width: "100%",  }}
                value={carData.vehicleType}
                onChange={handleChange}
              >
                <option value="TWO_WHEELER">TWO_WHEELER</option>
                <option value="FOUR_WHEELER">FOUR_WHEELER</option>
              </Select>
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="580px">Seating Capacity</FormLabel>
              <Select
                name="seatingCapacity"
                placeholder="Select Seating Capacity"
                style={{ width: "100%" }}
                value={carData.seatingCapacity}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Select>
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Distance</FormLabel>
              <Input
                name="distance"
                placeholder="Enter distance"
                style={{ width: "100%",  }}
                value={carData.distance}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Vehicle No.</FormLabel>
              <Input
                name="vehicleNo"
                placeholder="Enter Vehicle No."
                style={{ width: "100%" }}
                value={carData.vehicleNo}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Insurance No.</FormLabel>
              <Input
                name="insuranceNo"
                placeholder="Enter Insurance No."
                style={{ width: "100%", }}
                value={carData.insuranceNo}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Price</FormLabel>
              <Input
                name="price"
                placeholder="Enter Price"
                style={{ width: "100%" }}
                value={carData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="580px">Vehicle Service Type</FormLabel>
              <Select
                name="vehicleServiceType"
                placeholder="Select Service Type"
                style={{ width: "100%",  }}
                value={carData.vehicleServiceType}
                onChange={handleChange}
              >
                <option value="STANDARD">STANDARD</option>
                <option value="PREMIUM">PREMIUM</option>
              </Select>
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Price per KM</FormLabel>
              <Input
                name="pricePerKm"
                placeholder="Enter Price Per KM"
                style={{ width: "100%" }}
                value={carData.pricePerKm}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Range</FormLabel>
              <Input
                name="vehiclerange"
                placeholder="Enter Range"
                style={{ width: "100%" }}
                value={carData.vehiclerange}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl direction="row" display="flex">
              <FormLabel width="600px">Date of Purchase</FormLabel>
              <Input
                type="date"
                name="dateOfPurchase"
                placeholder="Enter Date Of Purchase"
                style={{ width: "100%" }}
                value={carData.dateOfPurchase}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                type="file"
                accept="image/*"
                display="none"
                ref={invoiceInputRef}
                onChange={handleInvoiceChange}
              />
              <Button
                onClick={() => invoiceInputRef.current.click()}
                leftIcon={<FaUpload />}
                colorScheme="blue"
                variant="outline"
              >
                Upload Invoice
              </Button>
              {invoicePreview && (
                <Image
                  src={invoicePreview}
                  alt="Invoice Preview"
                  mb={4}
                  maxW="full"
                  borderWidth={2}
                  borderColor="blue.600"
                  borderStyle="solid"
                  aspectRatio={1.82}
                  fill="zinc.300"
                  stroke="blue.600"
                  strokeWidth="1.56px"
                  w="120px"
                  mr={4}
                />
              )}
            </FormControl>

            <Button mt={8} type="submit" colorScheme="teal">
              Save
            </Button>
          </Flex>
        </form>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Car details added successfully!</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </>
  );
}

export default AddVehicle;
