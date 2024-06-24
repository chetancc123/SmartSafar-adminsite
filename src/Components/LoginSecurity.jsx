import { Flex, Text, Button, Input, Grid, Box } from "@chakra-ui/react";
import {} from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"; // Import Axios

const LoginSecurity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const { oldPassword, newPassword, confirmPassword } = password;
    // Validate form inputs
    if (
      oldPassword &&
      newPassword &&
      confirmPassword &&
      newPassword === confirmPassword
    ) {
      // Make API call if inputs are valid
      axios
        .post("http://localhost:8080/admin/1/change-password", {
          oldPassword,
          newPassword,
          confirmPassword,
        })
        .then((response) => {
          console.log(response.data); // Log response
          setIsModalOpen(true); // Open modal on success
        })
        .catch((error) => {
          console.error("Error:", error); // Log detailed error message from server
          if (error.response) {
            console.error("Response Data:", error.response.data); // Log response data if available
            console.error("Response Status:", error.response.status); // Log response status if available
          }
          // Handle error (show error message, etc.)
        });
    } else {
      // Handle form validation errors (show error message, etc.)
      console.error("Form validation failed");
    }
  };
  return (
    <>
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px" // Adjust based on your header height
        px={[4, 6]}
        left={10}
        mt={10}
      >
        <NavLink to={"/Setting"}>
          <Button ml="-500px">Account Setting</Button>
        </NavLink>

        {/* Content Area */}
      </Flex>

      {/* Account Setting */}
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px" // Adjust based on your header height
        px={[4, 6]}
        left={10}
      >
        {/* Content Area */}
      </Flex>

      {/* Profile Settings */}
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px" // Adjust based on your header height
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
          width="1000px"
          border="10px solid black"
          backgroundColor="white"
          flexDirection="column"
          py={5}
          pr={2}
          rounded="2xl"
          borderColor="blue.600"
          borderOpacity="0.8"
        >
          <Flex paddingTop={1}>
            <Text
              fontSize="16px"
              fontWeight="700"
              fontFamily="Poppins, sans-serif"
              color="black"
            >
              Change Your Password
            </Text>
          </Flex>
          {/* <Text
            fontSize="16px"
            fontWeight="200"
            fontFamily="Poppins, sans-serif"
            color="blue"
            mr={740}
          >
            Forget password ? Reset Here
          </Text>
 */}
          <Grid
            templateColumns="1fr 1fr"
            gap={4}
            paddingTop={8}
            marginRight={450}
            width={750}
          >
            <Text fontSize={15}>ENTER OLD PASSWORD</Text>
            <Input
              placeholder=" Enter otp send to your mobile no. "
              value={password.oldPassword}
              name="oldPassword"
              onChange={handleChange}
            />
            <Text fontSize={15}> New PASSWORD</Text>
            <Input
              placeholder="Enter new password"
              value={password.newPassword}
              name="newPassword" // Add name attribute
              onChange={handleChange}
            />
            <Text fontSize={15}> Confirm NEW PASSWORD</Text>
            <Input
              placeholder="Confirm new password"
              value={password.confirmPassword}
              name="confirmPassword" // Add name attribute
              onChange={handleChange}
            />
          </Grid>

          <Flex justifyContent="space-between" mt={10}>
            <Button colorScheme="blue" size="lg" onClick={handleSaveChanges}>
              Save Change
            </Button>
          
          </Flex>
        </Flex>
      </Flex>
      {isModalOpen && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="100"
          justifyContent="center"
          alignItems="center"
        >
          {/* Modal Content */}
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="lg"
            textAlign="center"
            height="250px"
            width="400px" // Adjust width as needed
          >
            {/* Flex container to center the image */}
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              {/* Image */}
              <img
                src="logo192.png"
                alt="Modal Image"
                width="50px" // Adjust width as needed
                height="50px" // Adjust height as needed
                mb="20px" // Add margin-bottom to create space between image and text
              />
              {/* Text Content */}
              <Text fontSize="xl" fontWeight="bold">
                You Have Successfully Changed Your Password
              </Text>
              <Button mt="20px" backgroundColor="teal" onClick={toggleModal}>
                Dashboard
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default LoginSecurity;
