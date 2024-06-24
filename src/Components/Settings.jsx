import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Flex, Text, Button, Input, Grid, Box, Image, useDisclosure } from '@chakra-ui/react';

const Settings = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [carData, setCarData] = useState({
    name: '',
    email: '',
    username: '',
    phoneNo: '',
    profilePic: '', // Added profilePic to carData state
  });
  const [profileImgLink, setProfileImgLink] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const adminId = sessionStorage.getItem('id'); // Correct sessionStorage key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/edit-admin-profile/${adminId}`);
        setCarData({
          name: response.data.name,
          email: response.data.email,
          username: response.data.address,
          phoneNo: response.data.phoneNo,
          profilePic: response.data.profileImgLink,
          adminId:response.data.adminId // Use profileImgLink from response data
        });
        setProfileImgLink(response.data.profileImgLink); // Set profileImgLink
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (adminId) {
      fetchData();
    }
  }, [adminId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
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
    
    // Append profile image or existing profile pic URL
    if (selectedImage) {
      formData.append('profileImg', selectedImage);
    } else if (carData.profilePic) {
      // If profilePic is a URL, we need to fetch it and convert it to a Blob
      try {
        const response = await fetch(carData.profilePic);
        const blob = await response.blob();
        formData.append('profileImg', blob, 'profilePic.jpg');
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    }
  
    // Append the other profile data fields as a JSON string
    const adminDataJson = JSON.stringify({
      adminId: adminId, // Use the retrieved adminId
      name: carData.name,
      // phoneNo: carData.phoneNo,
      address: carData.username, // Assuming the address is stored in carData.username
    });
  
    formData.append('AdminDataJson', adminDataJson);
  
    try {
      const response = await axios.put('http://localhost:8080/admin/edit-admin-profile', formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data' // Commenting this out since axios sets it automatically
        },
      });
      console.log('Data successfully submitted:', response.data);
      setShowSuccessMessage(true);
      alert("Successful Update")
      onOpen();
    } catch (error) {
      console.error('Error submitting data:', error);
      alert(error);
    }
  };

  const handleIconClick = () => {
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <Box mt="10px" height="100vh">
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="row">
          <Box justify="center" align="center" direction="row" height="5px" px={[4, 6]} left={10}>
            <NavLink to="/LoginSecurity">
              <Button ml="500px" mt="14px">Change Password</Button>
            </NavLink>
          </Box>
          <Box>
            <NavLink to="/LoginSecurity">
              <Button mt="14px" ml="-500px">Account settings</Button>
            </NavLink>
          </Box>
        </Flex>
        <Input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Flex justify="center" align="center" direction="row" height="5px" px={[4, 6]}>
          <Flex
            bg="white.100"
            p={6}
            borderRadius="md"
            boxShadow="md"
            mb={4}
            marginTop="700px"
            marginRight="40px"
            ml={{ base: 'none', md: '50px' }}
            height="100vh"
            width="1000px"
            border="1px solid red"
            flexDirection="column"
            py={5}
            pr={2}
            rounded="2xl"
            borderColor="blue.600"
            borderOpacity="0.8"
          >
            <Flex paddingTop={10}>
              <label htmlFor="imageInput">
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  src={selectedImage ? URL.createObjectURL(selectedImage) : profileImgLink || 'https://via.placeholder.com/150'}
                  alt="Profile Picture"
                  mt={{ base: 'none', md: '40px' }}
                  ml={{ base: 'none', md: '100px' }}
                  cursor="pointer"
                  onClick={handleIconClick}
                />
              </label>
            </Flex>
            <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
              <Text fontWeight="bold" textAlign="left">Full Name</Text>
              <Input
                placeholder="Full Name"
                name="name"
                value={carData.name}
                onChange={handleChange}
              />
              <Text fontWeight="bold" textAlign="left">Email</Text>
              <Input
                placeholder="Email Address"
                name="email"
                value={carData.email}
                onChange={handleChange}
                readOnly
              />
            </Grid>
            <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
              <Text fontWeight="bold" textAlign="left">Address</Text>
              <Input
                placeholder="Address"
                name="username"
                value={carData.username}
                onChange={handleChange}
              />
              <Text fontWeight="bold" textAlign="left">Phone Number</Text>
              <Input
                placeholder="Phone Number"
                name="phoneNo"
                value={carData.phoneNo}
                onChange={handleChange}
                readOnly
              />
            </Grid>

            <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
              <Text fontWeight="bold" textAlign="left">Address</Text>
              <Input
                placeholder="Address"
                name="username"
                value={carData.username}
                onChange={handleChange}
              />
              <Text fontWeight="bold" textAlign="left">Admin Id</Text>
              <Input
                placeholder="Phone Number"
                name="phoneNo"
                value={carData.adminId}
                onChange={handleChange}
                readOnly
              />
            </Grid>
            <Grid templateColumns="auto 1fr" gap={4} paddingTop={10} mt="50px">
              <Button colorScheme="orange" size="lg" type="submit">
                Update Profile
              </Button>
             
            </Grid>
          </Flex>
        </Flex>
      </form>
      {isImageModalOpen && (
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
          onClick={closeModal}
        >
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="lg"
            textAlign="center"
            height="250px"
            width="400px"
          >
            <Image
              boxSize="200px"
              objectFit="cover"
              src={profileImgLink || 'https://via.placeholder.com/150'}
              alt="Profile Picture"
              margin="auto"
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Settings;
