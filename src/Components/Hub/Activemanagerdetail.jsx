import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";

const Activemanagerdetail = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [managerDetails, setManagerDetails] = useState({});
  const { hubId } = useParams();

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/payemnt-history/${hubId}`
        );
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    const fetchManagerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/hub-manager-details/${hubId}`
        );
        setManagerDetails(response.data);
      } catch (error) {
        console.error("Error fetching manager details:", error);
      }
    };

    fetchPaymentHistory();
    fetchManagerDetails();
  }, [hubId]);
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/payment-history/${hubId}`);
        const paymentHistory = response.data.map(item => {
          const date = new Date(item.date);
          const localDate = date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          const localTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
          return { ...item, date: localDate, time: localTime };
        });
        setPaymentHistory(paymentHistory);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };
    
    
    
    

    fetchPaymentHistory();
  }, [hubId]);
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
                Active Manager Detail
              </Text>
            </NavLink>
          </Box>
        </Box>
        <Box ml={{ base: "none", md: "10px" }} width="1100"></Box>
      </Flex>

      {/* Manager Details */}
      <Box border="3px solid #13C39C" p="4" mt={10} ml={5}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr="4">
              <Image
                src={
                  managerDetails.profileImgLink || "https://bit.ly/dan-abramov"
                }
                alt={managerDetails.managerName || "Manager Image"}
                boxSize="150px"
              />
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="xl" mb="2">
                Manager Name: {managerDetails.managerName}
              </Text>
              <Text fontSize="md" fontWeight="bold" color="gray" mb="2">
                HUB NAME: {managerDetails.hubName || "N/A"}
              </Text>
              <Text fontSize="md" mb="2">
                Address: {managerDetails.hubAddress}
              </Text>
              <Text fontSize="md" mb="2">
                Id: {managerDetails.hubId}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" mt="10">
            <Box border="3px solid #13C39C" px="4" py="2" mb="2" mr="2">
              <Text fontWeight="bold" fontSize="md">
                Phone number
              </Text>
              <Text fontWeight="bold" fontSize="md" color="#248efd">
                {managerDetails.phoneNo}
              </Text>
            </Box>

            <Box border="3px solid #13C39C" px="4" py="2" mb="2" mr="2">
              <Text fontWeight="bold" fontSize="md">
                Email id
              </Text>
              <Text fontWeight="bold" fontSize="md" color="#248efd">
                {managerDetails.email}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Payment & Previous ride */}
      <Box ml={{ base: "none", md: "10px" }} marginBottom="-7" marginTop="5">
        <Text fontWeight="700">Payment & Previous ride</Text>
      </Box>
      <Flex>
        <Box
          position="relative"
          marginLeft="250"
          w={{ base: "80%", md: "80%" }}
          h="250px"
          overflowY="auto"
          p={4}
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
          border="3px solid #13C39C"
          ml={{ base: "none", md: "10px" }}
        >
          {/* Payment history */}
          <Flex direction="column">
            <Text fontWeight="700" marginBottom="10px">
              Payment history
            </Text>
            {/* Display payment history */}
            {paymentHistory.map((payment, index) => (
              <Flex
                key={index}
                marginBottom="10px"
                flexDirection="row"
                color="black"
                mr="100px"
              >
                <Box marginRight="20px">
                  <Text>Date: {payment.date}</Text>
                </Box>
                <Box>
                  <Text>Total Earnings: {payment.amount}</Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Activemanagerdetail;
