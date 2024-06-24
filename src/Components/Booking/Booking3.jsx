import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  Text,
  Select,
} from "@chakra-ui/react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from 'axios';


export const Booking3 = () => {
  const [bookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hub/getAll_courierList_and_eBikeCourierList_fourWheelerCourierList/1');
        // Convert date strings to local dates
        const dataWithLocalDates = response.data.map(booking => ({
          ...booking,
          startDateTime: new Date(booking.startDateTime).toLocaleString()
        }));
        setBookingData(dataWithLocalDates);
        setFilteredData(dataWithLocalDates);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on selected vehicle type
    if (selectedVehicleType === "All") {
      setFilteredData(bookingData);
    } else {
      const filtered = bookingData.filter(item => item.vehicleType === selectedVehicleType);
      setFilteredData(filtered);
    }
  }, [selectedVehicleType, bookingData]);

  return (
    <>
    
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Transport List
      </Text>{" "}
      {/* Dropdown for vehicle type */}
      <Select
        value={selectedVehicleType}
        onChange={(e) => setSelectedVehicleType(e.target.value)}
        mb="4"
      >
        <option value="All">All</option>
        <option value="TWO_WHEELER">Two Wheeler</option>
        <option value="FOUR_WHEELER">Four Wheeler</option>
      </Select>
      {/* Title */}
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>S.no</Th>
              <Th>Label</Th>
              <Th>Booking Data</Th>
              <Th>Booking Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((booking, index) => (
              <Tr key={index} borderBottom="2px solid gray">
                <Td>{index + 1}</Td> {/* Display the serial number */}
                <Td>{booking.senderName} - {booking.driverName}</Td>
                <Td>
                  {booking.senderAddress} - {booking.receiverAddress}
                  <br />
                  <Icon as={FaPhone} /> <span>{booking.senderPhoneNumber}</span> <br />
                  <Icon as={FaMapMarkerAlt} /> <span>{booking.totalDistance} Km</span>
                </Td>
                <Td>{booking.startDateTime}</Td>
                <Td
                  style={{
                    color: booking.isConfirm === "CONFIRMED" ? "teal" : "red",
                  }}
                >
                  {booking.isConfirm}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
