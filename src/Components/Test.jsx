import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";

// Define a reusable component for IssueDetail
function IssueDetail({ issue }) {
  return (
    <Box>
      <table>
        <tbody>
          {issue.map((item, index) => (
            <tr key={index}>
              <td style={{ verticalAlign: "top", paddingRight: "16px" }}>
                <p>Vehicle Name: {item.vehicleName}</p>
                <p>Vehicle Number: {item.vehicleNo}</p>
              </td>
              <td style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>Issue</th>
                  </tr>
                </thead>
                {/* <Text >Issue </Text> */}
                <p>{item.message}</p>
                <Button mt={2} mr={"20px"} size="sm" colorScheme="blue">
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

// Main component with the design layout
function CarRepairingAppointment() {
  const [carIssues, setCarIssues] = useState([]);

  useEffect(() => {
    const fetchCarIssues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hub/all-car-issue/1"
        );
        setCarIssues(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCarIssues();
  }, []);

  return (
    <>
      <Home />
      <Box
        flexDirection="column"
        gap={5}
        p={2}
        color="black"
        bg="white"
        rounded="xl"
        borderWidth="2px"
        borderColor="blue.600"
        mt="300px"
        w="fit-content"
        border="1px solid blue"
        marginLeft="155px"
        overflowY="auto"
        maxH="300px"
      >
        {carIssues.length > 0 ? (
          <IssueDetail issue={carIssues} />
        ) : (
          <p>No car issues found.</p>
        )}
      </Box>
    </>
  );
}

export default CarRepairingAppointment;
