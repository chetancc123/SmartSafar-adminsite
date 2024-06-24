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
} from "@chakra-ui/react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";


export const Booking4 = () => {
  const bookingData = [
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Noida ",
      bookingDate: "Tue apr 12,2023",
      status: "Approved",
    },
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Raipur ",
      bookingDate: "Tue apr 12,2023",
      status: "Pending",
    },
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Raipur ",
      bookingDate: "Tue apr 12,2023",
      status: "Pending",
    },
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Raipur ",
      bookingDate: "Tue apr 12,2023",
      status: "Pending",
    },
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Raipur ",
      bookingDate: "Tue apr 12,2023",
      status: "Approved",
    },
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Raipur ",
      bookingDate: "Tue apr 12,2023",
      status: "Pending",
    },
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Raipur ",
      bookingDate: "Tue apr 12,2023",
      status: "Pending",
    },
    {
      label: "Time Slot - 4:00 <br/> Driver - john",
      bookingData: "user name Delhi -> Raipur ",
      bookingDate: "Tue apr 12,2023",
      status: "Approved",
    },
  ];

  return (
    <>
    
      <Text fontSize="xl" fontWeight="bold" mb="4">
        E-BIKE  List
      </Text>{" "}
      {/* Title */}
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Label</Th>
              <Th>Booking Data</Th>
              <Th>Booking Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookingData.map((booking, index) => (
              <Tr key={index} borderBottom="2px solid gray">
                <Td>{index + 1}</Td> {/* Display the serial number */}
                <Td dangerouslySetInnerHTML={{ __html: booking.label }} />
                <Td>
                  {booking.bookingData}
                  <br />
                  <Icon as={FaPhone} /> <span>8103490175</span> <br />
                  <Icon as={FaMapMarkerAlt} /> <span>50Km</span>
                </Td>
                <Td>{booking.bookingDate}</Td>
                <Td
                  style={{
                    color: booking.status === "Approved" ? "teal" : "red",
                  }}
                >
                  {booking.status}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
