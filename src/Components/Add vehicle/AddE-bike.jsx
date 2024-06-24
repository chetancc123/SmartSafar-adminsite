import React, { useState, useRef } from "react";
import { ChevronLeftIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
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
  IconButton,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

function AddVehicle() {
  const [files, setFiles] = useState([]);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [carData, setCarData] = useState({
    vehicleName: "",
    chassisNo: "",
    battery: "",
    chargingTime: "",
    vehicleNo: "",
    rc: "",
    insuranceNo: "",
    weight: "",
    pricePerKm: "",
    topSpeed: "",
    dateOfPurchase: "",
    ebikerange: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [invoicePreview, setInvoicePreview] = useState(null);
  const adminId = sessionStorage.getItem("id");
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
      data.append("ebikeImage", file);
    });
    data.append("CourierEbikeDto", JSON.stringify(carData));
    if (invoiceFile) {
      data.append("invoice", invoiceFile);
    }

    const config = {
      method: "post",
      url: `http://localhost:8080/admin/add-new-courierEbike/${adminId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log("Response:", JSON.stringify(response.data));
      setShowSuccessMessage(true);
      onOpen();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <>
      <VStack spacing={4} alignItems="center" mt={10}>
        <Button color="red" mr="550px">
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
            {Object.keys(carData).map((key) => (
              <FormControl key={key} direction="row" display="flex">
                <FormLabel width="600px" textTransform="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </FormLabel>
                <Input
                  name={key}
                  type={key === "dateOfPurchase" ? "date" : "text"}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                  style={{ width: "100%" }}
                  value={carData[key]}
                  onChange={handleChange}
                />
              </FormControl>
            ))}

            <FormControl mt={4}>
              <Input
                type="file"
                accept="application/pdf"
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
                <Box mt={4}>
                  <Text>Invoice Preview:</Text>
                  <Image
                    src={invoicePreview}
                    alt="Invoice Preview"
                    maxW="200px"
                  />
                </Box>
              )}
            </FormControl>

            <Button colorScheme="teal" type="submit" mt={4}>
              Submit
            </Button>
          </Flex>
        </form>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vehicle Added Successfully</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showSuccessMessage && (
              <Text>The vehicle has been added successfully!</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddVehicle;
