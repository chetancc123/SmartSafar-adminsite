import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SimpleGrid } from "@chakra-ui/react";

const AdminSignup = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [smsOtp, setSmsOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const navigate = useNavigate();

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/emailSendOtp",
        { email }
      );
      console.log("Success:", response.data);
      setIsEmailVerified(true);
      alert("Email Otp send");
    } catch (error) {
      if (error.response && error.response.status === 302) {
        alert("User with this email already exists");
      } else {
        console.log(
          "Server responded with error:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/signUpWithPhone",
        { phoneNo }
      );
      console.log("Success:", response.data);
      setIsPhoneVerified(true);
      alert("Phone sebd Otp");
    } catch (error) {
      if (error.response && error.response.status === 302) {
        alert("User with this PhoneNumber already exists");
      } else {
        console.log(
          "Server responded with error:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleEmailVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/verify-email-otp",
        { email, emailOtp }
      );
      console.log(response.data);
      if (response.data.success) {
        setIsEmailVerified(true);
      }
      alert("Email verify Otp");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to verify email. Please try again later.");
    }
  };

  const handlePhoneVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/verify-phoneno",
        { phoneNo, smsOtp }
      );
      console.log(phoneNo, smsOtp);
      console.log(response.data);
      if (response.data.success) {
        setIsPhoneVerified(true);
      }
      alert("Phone verify Otp");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to verify phone number. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified || !isPhoneVerified) {
      alert("Please verify email and phone number first!");
      return;
    }

    const payload = {
      username,
      email,
      phoneNo,
      password,
      
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/signup",
        payload
      );
      console.log(response.data);
      alert("Hub registered successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box width="500px" p={5} borderWidth="1px" borderRadius="lg">
        <Heading as="h2" size="lg" mb={4}>
          Sign up
        </Heading>
        <Text>Give Admin to Create an account</Text>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <FormControl mb={4}>
            {/* <FormLabel>Full Name</FormLabel> */}
            <Input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Enter  Full Name"
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <SimpleGrid columns={2} spacing={5}>
              <Box>
                {/* <FormLabel>Email</FormLabel> */}
                <Input
                  style={{ width: "100%" }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
              </Box>
              <Box>
                <Button
                  colorScheme="blue"
                  onClick={handleEmailVerification}
                  style={{ marginLeft: "27%" }}
                >
                  Send Email OTP
                </Button>
              </Box>
              <Box>
                <Input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter Email OTP"
                  required
                />
              </Box>
              <Box>
                <Button
                  colorScheme="blue"
                  onClick={handleEmailVerify}
                  style={{ marginLeft: "27%" }}
                >
                  Verify Email OTP
                </Button>
              </Box>
            </SimpleGrid>
          </FormControl>
          <FormControl mb={4}>
            <SimpleGrid columns={2} spacing={5}>
              <Box>
                {/* <FormLabel>Phone Number</FormLabel> */}
                <Input
                  type="tel"
                  value={phoneNo}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  placeholder="+91 Enter  Phone Number"
                  required
                />
              </Box>
              <Box>
                <Button
                  colorScheme="blue"
                  onClick={handlePhoneVerification}
                  style={{ marginLeft: "27%" }}
                >
                  Send Phone OTP
                </Button>
              </Box>
              <Box>
                <Input
                  type="text"
                  value={smsOtp}
                  onChange={(e) => setSmsOtp(e.target.value)}
                  placeholder="Enter Phone OTP"
                  required
                />
              </Box>
              <Box>
                <Button
                  colorScheme="blue"
                  onClick={handlePhoneVerify}
                  style={{ marginLeft: "27%" }}
                >
                  Verify Phone OTP
                </Button>
              </Box>
            </SimpleGrid>
          </FormControl>
          <FormControl mb={4}>
            {/* <FormLabel>New Password</FormLabel> */}
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter  New password"
              required
            />
          </FormControl>
         

          {/* Submit button */}
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            disabled={!isEmailVerified || !isPhoneVerified}
          >
            Sign up
          </Button>

          {/* Sign in link */}
          <Text mt={4} textAlign="center">
            Already have an account?{" "}
            <a href="/" style={{ color: "blue" }}>
              Sign In
            </a>
          </Text>
        </form>
      </Box>

      <Box p={10} width="500px" mt="-60px">
        <Heading as="h1" mt={4} fontFamily="Arial, sans-serif">
          Smart-Safar
        </Heading>
        <Text>Your travel recommendations</Text>
        <Image src="photo.png" mt="200px" />
      </Box>
    </Flex>
  );
};

export default AdminSignup;
