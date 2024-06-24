import React, { useState, useContext } from "react";
import { FormControl, FormLabel, Input, Button, Flex, Box, Heading, Text, Link } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/Authcontext";

const AdminLogin = () => {
  const { login ,user} = useContext(AuthContext);
  const [usernameOrEmailOrPhoneNumber, setUsernameOrEmailOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        usernameOrEmailOrPhoneNumber,
        password,
      };
  
      const response = await axios.post('http://localhost:8080/api/signin', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const userIdResponse = await axios.get(`http://localhost:8080/admin/admin-profile-by-email?email=${usernameOrEmailOrPhoneNumber}`);
  
        if (userIdResponse.status === 200) {
          const { token, username, phoneNo, roles, driverType } = response.data;
          const {id, name, profileImgLink, email} = userIdResponse.data;
          
          // Debugging: Log the retrieved data
          
  
          // Store data in session storage
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('id', id);
          sessionStorage.setItem('profileImgLink', profileImgLink || ''); // Ensure a default value
          sessionStorage.setItem('username', username); // Store username here
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('phoneNo', phoneNo);
          sessionStorage.setItem('roles', JSON.stringify(roles));
          sessionStorage.setItem('driverType', driverType);
  
          login(user);
          alert("Login Successful");
          navigate('/dashboard');
        } else {
          console.error('Failed to fetch user profile:', userIdResponse.data);
          alert('Error: Login failed. Please check your credentials.');
        }
      } else {
        console.error('Login failed:', response.data);
        alert('Error: Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login Error: An error occurred while trying to log in.');
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" flexDirection="column" m={"auto"}>
      <Box width="400px" p={8} borderWidth="1px" borderRadius="lg">
        <Heading as="h2" size="lg" mb={4}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Username, Email, or Phone Number</FormLabel>
            <Input
              type="text"
              value={usernameOrEmailOrPhoneNumber}
              onChange={(e) => setUsernameOrEmailOrPhoneNumber(e.target.value)}
              placeholder="Username, Email, or Phone Number"
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">Sign in</Button>
          <Flex mt={4}>
            <Box>
              <Text textAlign="center">Don't have an account?</Text>
            </Box>
            <Box ml="10px">
              <Link href="/AdminSignup" color="blue">AdminSignup</Link>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AdminLogin;