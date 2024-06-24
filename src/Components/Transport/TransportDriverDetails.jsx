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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdBookmark, MdAttachMoney } from "react-icons/md";
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
          <Flex justifyContent="center" alignItems="center" mb="4">
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

  const handleApprove = () => {
    setApprovalModalOpen(true);
  };

  const handleDecline = () => {
    setDeclineModalOpen(true);
  };
  return (
    <Box>
      <Box border="1px solid #248efd" p="4" mb="4">
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
                Driver ID: 123213
              </Text>
              <Text fontSize="md" mb="2">
                Email: bibhushansaakha@gmail.com
              </Text>
              <Text fontSize="md" mb="2">
                Contact NO: +977 9840103828
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" mt="10">
            <Box border="1px solid red" px="4" py="2" mb="2" mr="2">
              <Text fontWeight="bold" fontSize="md">
                Today Total Ride
              </Text>
              <Text fontWeight="bold" fontSize="md" color="#248efd">
                2
              </Text>
            </Box>
            <Box border="1px solid red" px="4" py="2" mb="2" mr="2">
              <Text fontWeight="bold" fontSize="md">
                Todays Earning
              </Text>
              <Text fontWeight="bold" fontSize="md" color="#248efd">
                566556346543
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Text fontWeight="bold">Document Information</Text>
        <Box border="1px solid #248efd" p="4" mb="4">
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Flex m="3">
                <Box>Document Type: </Box>
                <Box ml="3">Driving License Document</Box>
              </Flex>
              <Flex m="3">
                <Box>Registraion No.: </Box>
                <Box ml="3">1234567898</Box>
              </Flex>
              <Flex m="3">
                <Box>Passbook: </Box>
                <Box ml="12">
                  <MdBookmark
                    style={{ marginRight: "0.5em", fontSize: "150%" }}
                  />
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Box>Date of Request: </Box>
                <Box ml="3">June 17, 2003</Box>
              </Flex>
              <Flex>
                <Box>Signature: </Box>
                <Box ml="10">
                  <MdBookmark
                    style={{ marginRight: "0.5em", fontSize: "150%" }}
                  />
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex alignItems="center" mb="2">
                <Box mr="4">Pan No.: </Box>
                <Box ml="2">ABCTY1234D</Box>
              </Flex>
              <Flex alignItems="center" mb="3">
                <Box mr="4">Address: </Box>
                <Box ml="2">Santoshi Nagar, Raipur</Box>
              </Flex>
              <Flex alignItems="center" mb="1">
                <Box mr="4">UID No.: </Box>
                <Box ml="2">1234567891012146</Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box>
        <Flex justifyContent="center">
          <Flex justifyContent="center">
            <Button colorScheme="blue" onClick={handleApprove}>
              Approve
            </Button>
            <Button colorScheme="red" ml="2" onClick={handleDecline}>
              Decline
            </Button>
          </Flex>
        </Flex>
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
