import React, { useState, useRef } from "react";
import { Box, Button, Flex, IconButton, Input } from "@chakra-ui/react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";


const ExactRepairAmount = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalCost, setTotalCost] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    // Trigger click event of input element when button is clicked
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("invoice", selectedFile);
    formData.append("totalCostOfRepairing", totalCost);

    try {
      const response = await axios.post(
        "http://localhost:8080/hub/carRepairDetailCost/2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Cookie: "JSESSIONID=8983F1A13AA6D38696F64F7583C030D7",
          },
        }
      );
      console.log("Data successfully submitted:", response.data);
      // Handle success response here, maybe display a success message
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error here, maybe display an error message
    }
  };

  return (
  <>
  
  <Flex
      justifyContent="center"
      alignItems="center"
      px={16}
      py={20}
      bg="white"
      maxW="1080px"
      mx="auto"
    >
      <Box
        py={5}
        mt={-20}
        w="100%"
        rounded="xl"
        borderWidth="1px"
        borderColor="rgba(227, 227, 227, 0.2)"
        _hover={{ borderColor: "rgba(227, 227, 227, 0.2)" }}
      >
        {/* Car repair detail cost section */}

        {/* Upload document button */}
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <Button
            as="span"
            bg="transparent"
            color="white"
            fontWeight="semibold"
            fontSize="base"
            backgroundColor={"blue"}
            mt={10}
            onClick={handleButtonClick}
          >
            Click to select Document
          </Button>

          <IconButton
            aria-label="Upload"
            icon={<FaUpload />}
            variant="outline"
            colorScheme="blue"
            mt={40}
            ml="-125px"
            onClick={handleButtonClick}
          />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        {/* Total cost input */}
        <Input
          placeholder="Total Cost of repairing"
          p={4}
          mt={8}
          rounded="xl"
          borderWidth="1px"
          borderColor="black"
          color="zinc.400"
          opacity="0.8"
          value={totalCost}
          onChange={(e) => setTotalCost(e.target.value)}
        />

        {/* Action buttons */}
        <Flex
          justifyContent="flex-end"
          mt={40}
          maxW="427px"
          fontSize="base"
          fontStyle="light"
          whiteSpace="nowrap"
          flexWrap="wrap"
        >
          <Button
            flex="1"
            justifyContent="center"
            alignItems="center"
            px={16}
            py={3.5}
            rounded="xl"
            borderWidth="1px"
            borderColor="black"
            color="zinc.900"
            maxW="50%"
            mr={2.5}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            flex="1"
            justifyContent="center"
            px={14}
            py={3.5}
            rounded="xl"
            bg="blue.600"
            color="white"
            maxW="50%"
          >
            Send report
          </Button>
        </Flex>
      </Box>
    </Flex>
  
  </>
  );
};

export default ExactRepairAmount;
