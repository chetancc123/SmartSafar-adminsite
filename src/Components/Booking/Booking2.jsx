import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Icon, Text } from '@chakra-ui/react';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';


export const Booking2 = () => {
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/hub/totalCompleteBooking/1');
                setBookingData(response.data); // Assuming response.data is an array of booking objects
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookingData();
    }, []);

    return (
        <>
        
            <Text fontSize="xl" fontWeight="bold" mb="4">Schedule List</Text>

            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>S NO</Th>
                            <Th>LABEL</Th>
                            <Th>BOOKING DATA</Th>
                            <Th>BOOKING DATE</Th>
                            <Th>STATUS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookingData.map((booking, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{booking.customerName}</Td>
                                <Td>
                                    <div>
                                        {booking.tripFrom.address} - {booking.tripTo.address}<br />
                                        <Icon as={FaPhone} /> <span>{booking.tripFrom.userLatitude}, {booking.tripFrom.userLongitude}</span> <br />
                                        <Icon as={FaMapMarkerAlt} /> <span>{booking.tripTo.userLatitude}, {booking.tripTo.userLongitude}</span>
                                    </div>
                                </Td>
                                <Td>{new Date(booking.startDateTime).toLocaleString()}</Td>
                                <Td>{booking.driverAssigned ? 'Approved' : 'Pending'}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
