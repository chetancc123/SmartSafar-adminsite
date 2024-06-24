import React, { Component } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Hubhome extends Component {
  state = {
    activeTab: "driver", // Default active tab is 'driver'
    activeManagerData: [],
    hubData: [],
  };

  componentDidMount() {
    // Fetch hub data using the new API
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/admin/get-all-hublist/1',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        this.setState({ hubData: response.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the hub data!", error);
      });
  }

  render() {
    const { activeTab, hubData } = this.state;

    return (
      <Flex direction="column" align="center" mt={8}>
        <Flex mb={4}>
          <Button
            variant={activeTab === "driver" ? "solid" : "outline"}
            colorScheme={activeTab === "driver" ? "teal" : "gray"}
            onClick={() => this.setState({ activeTab: "driver" })}
          >
            Manager List
          </Button>
          <Button
            ml={4}
            variant={activeTab === "hub" ? "solid" : "outline"}
            colorScheme={activeTab === "hub" ? "teal" : "gray"}
            onClick={() => this.setState({ activeTab: "hub" })}
          >
            Hub List
          </Button>
        </Flex>
        {activeTab === "driver" && (
          <Text bg="gray.100" p={4} mb={4} w="80%">
            Manager List
          </Text>
        )}
        {activeTab === "driver" && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Manager Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hubData.map((item, index) => (
                  <Tr key={index + 1}>
                    <Td>{index + 1}</Td>{" "}
                    {/* Increment index by 1 for display */}
                    <Td>{item.managerName}</Td>
                    <Td>
                      <NavLink to={`/Activemanagerdetail/${item.hubId}`}>
                        <Button bg="Teal">Detail</Button>
                      </NavLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {activeTab === "hub" && (
          <Text bg="gray.100" p={4} mb={4} w="80%">
            Hub List
          </Text>
        )}
        {activeTab === "hub" && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Location</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hubData.map((item, index) => (
                  <Tr key={index + 1}>
                    <Td>{index + 1}</Td>{" "}
                    {/* Increment index by 1 for display */}
                    <Td>{item.city}</Td>
                    <Td>
                      <NavLink to={"/Hublistdetail"}>
                        <Button bg="Teal">Detail</Button>
                      </NavLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>
    );
  }
}

export default Hubhome;
