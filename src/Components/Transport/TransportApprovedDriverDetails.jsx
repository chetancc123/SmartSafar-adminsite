import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { MdBookmark, MdAttachMoney } from 'react-icons/md';


const TransportApprovedDriverDetails = () => {

    return (
      <>
    
      <Box>
            <Box border="1px solid #248efd" p="4" mb="4">
                <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box mr="4">
                            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' boxSize="150px" />
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
                            <Text fontWeight="bold" fontSize="md" >
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
                                    <MdBookmark style={{ marginRight: "0.5em", fontSize: "150%" }} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex m="3">
                                <Box>Date of Issue:: </Box>
                                <Box ml="3">June 17, 2003</Box>
                            </Flex>
                            <Flex m="3">
                                <Box>Date of Issue:: </Box>
                                <Box ml="3">June 24, 2025</Box>
                            </Flex>
                            <Flex m="3">
                                <Box>Signature: </Box>
                                <Box ml="10">
                                    <MdBookmark style={{ marginRight: "0.5em", fontSize: "150%" }} />
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

            <Box >
                <Text fontWeight="bold">Payment & Previous ride</Text>
                <Box h="300px" border="1px solid #248efd" p="4" mb="4">
                    <Flex alignItems="center" justifyContent="space-between">
                        <Box border={"1px solid red"}>

                        </Box>
                        <Box border={"1px solid red"}>
                            <Flex justifyContent="space-evenly" marginLeft="150px">
                                <Box>
                                    <Text>
                                        Payment History
                                    </Text>
                                </Box>
                                <Box>
                                    <Button color={"blue"}> View All </Button>
                                </Box>
                            </Flex>
                            <Flex justifyContent="space-evenly">
                                <Box>
                                    <Text>
                                        14/06/2021, 14:24 AM
                                    </Text>
                                </Box>
                                <Box>
                                    <Text color={"blue"}>10000</Text>
                                </Box>
                            </Flex>
                            <Flex justifyContent="space-evenly">
                                <Box>
                                    <Text>
                                        24/05/2021, 22:30 AM
                                    </Text>
                                </Box>
                                <Box>
                                    <Text color={"blue"}>22000</Text>
                                </Box>
                            </Flex>
                            <Flex justifyContent="space-evenly">
                                <Box>
                                    <Text>
                                        11/04/2021, 16:20 AM
                                    </Text>
                                </Box>
                                <Box>
                                    <Text color={"blue"}>20000</Text>
                                </Box>
                            </Flex>

                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Box>
      </>
    );
};

export default TransportApprovedDriverDetails;
