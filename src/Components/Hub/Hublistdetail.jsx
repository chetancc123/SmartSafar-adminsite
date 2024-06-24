import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  VStack,
  useFocusEffect,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MdBookmark, MdAttachMoney } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
const ApprovalModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Approval Success</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent="center" alignItems="center" mb="4">
            <Box color="green" mr="2">
              <MdBookmark style={{ fontSize: "24px" }} />
            </Box>
            <Text fontWeight="bold">Success</Text>
          </Flex>
          <Text>You have successfully approved the driver.</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            Dashboard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DeclineModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent="center" alignItems="center">
            <Box color="red" mr="2">
              <MdAttachMoney style={{ fontSize: "24px" }} />
            </Box>
            <Text fontWeight="bold">Failure</Text>
          </Flex>
          <Text>You have successfully Declined Driver Request.</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const TransportDriverDetails = () => {
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income,setINcome] = useState(0);
  const[expense, setTotalexpense] = useState(0);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hub/totalAmountOfcurrentMonth/1"
        );
        setTotalBalance(response.data);
      } catch (error) {
        console.error("Error fetching total balance:", error);
      }
    };

    fetchTotalBalance();
  }, []);
 
  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/availableAmountForCurrentMonth/1"
        );
        setINcome(response.data);
      } catch (error) {
        console.error("Error fetching total balance:", error);
      }
    };

    fetchTotalIncome();
  }, []);
  useEffect(() => {
    const fetchTotalexpense = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/totalExpensesForCurrentMonth/1"
        );
        setTotalexpense(response.data);
      } catch (error) {
        console.error("Error fetching total balance:", error);
      }
    };

    fetchTotalexpense();
  }, []);



  const handleApprove = () => {
    setApprovalModalOpen(true);
  };

  const handleDecline = () => {
    setDeclineModalOpen(true);
  };
  return (
    <Box>
      <Box border="3px solid #13C39C" p="4" mt={10} ml={5}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr="4">
              <Image
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
                boxSize="150px"
              />
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="xl" mb="2">
                Bibhushan Saakha
              </Text>
              <Text fontSize="md" fontWeight="bold" color="gray" mb="2">
                HUB NAME: ABCD
              </Text>
              <Text fontSize="md" mb="2">
                Total Earning: 545
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" mt="10">
            <Box border="1px solid red" px="4" py="2" mb="2" mr="2">
              <Text fontWeight="bold" fontSize="md">
                Total Balance
              </Text>
              <Text fontWeight="bold" fontSize="md" color="#248efd">
                {totalBalance}
              </Text>
            </Box>

            <Box border="1px solid red" px="4" py="2" mb="2" mr="2">
              <Text fontWeight="bold" fontSize="md">
                Income
              </Text>
              <Text fontWeight="bold" fontSize="md" color="#248efd">
                {income}
              </Text>
            </Box>
            <Box border="1px solid red" px="4" py="2" mb="2" mr="2">
              <Text fontWeight="bold" fontSize="md">
               Expense
              </Text>
              <Text fontWeight="bold" fontSize="md" color="#248efd">
               {expense}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box>
        <VStack spacing={4}>
          <Link to="/EmployeePayment1">
            {/* <Box
              bg="blue.100"
              h="10vh"
              w="65vw"
              padding="10"
              borderRadius="10"
              ml="-100"
              mt="10"
            >
              <Flex justifyContent="space-between" alignItems="center" h="100%">
                <Text fontWeight="bold">Employee payment</Text>
                <Text>30000</Text>
                <Text> This month 5/03/2024</Text>
              </Flex>
            </Box> */}
          </Link>

          <Link to="/Carmaintainance">
            <Box
              bg="green.100"
              h="10vh"
              w="65vw"
              padding="10"
              borderRadius="10"
              ml="-100"
              mt="10"
            >
              <Flex justifyContent="space-between" alignItems="center" h="100%">
                <Text fontWeight="bold">Car Maintainance</Text>
                {/* <Text>30000</Text> */}
                <Text> This month 5/03/2024</Text>
              </Flex>
            </Box>
          </Link>
          <Link to="/DriverPayment1">
            <Box
              bg="yellow.100"
              h="10vh"
              w="65vw"
              padding="10"
              borderRadius="10"
              ml="-100"
              mt="10"
            >
              <Flex justifyContent="space-between" alignItems="center" h="100%">
                <Text fontWeight="bold">Driver payment</Text>
                <Text>30000</Text>
                <Text> This month 5/03/2024</Text>
              </Flex>
            </Box>
          </Link>
          <Link to="/Activemanagerdetail">
            <Box
              bg="red.100"
              h="10vh"
              w="65vw"
              padding="10"
              borderRadius="10"
              ml="-100"
              mt="10"
            >
              <Flex justifyContent="space-between" alignItems="center" h="100%">
                <Text fontWeight="bold">Earning</Text>
                <Text>30000</Text>
                <Text>This month 5/03/2024</Text>
              </Flex>
            </Box>
          </Link>
        </VStack>
      </Box>
      <ApprovalModal
        isOpen={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
      />
      <DeclineModal
        isOpen={declineModalOpen}
        onClose={() => setDeclineModalOpen(false)}
      />
    </Box>
  );
};

export default TransportDriverDetails;