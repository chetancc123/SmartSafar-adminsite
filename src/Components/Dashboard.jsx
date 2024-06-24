import { useState } from "react";
import { Box, Flex, Icon, Text, Select } from "@chakra-ui/react";
import { FaList, FaBars } from "react-icons/fa";
import { IoPeople, IoPeopleCircleSharp } from "react-icons/io5";
import { LuTarget } from "react-icons/lu";
import { NavLink } from "react-router-dom"; // Assuming you are using react-router-dom for navigation
import Activedrivercount from "./driver/Activedrivercount";
import NewBookingcount from "./Booking/NewbookingCount";

import Chart1 from "./Graph/TransportEarningChart";
import RentalBarChart from "./Graph/RentalGraph";
import ScheduleBarChart from "./ScheduleBarChart";
import TotalBalance from "./Dashboard/TotalBalance";
import TransportBarChart from "./Graph/TransportGraph";
import TransportEarningChart from "./Graph/TransportEarningChart";
import RentalEarningChart from "./Graph/RentalEarningChart";
import ScheduleEarningChart from "./Graph/ScheduleEarningChart";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState("ScheduleBooking");
  const [selectedEarningChart, setSelectedEarningChart] = useState("ScheduleEarningChart");

  const handleSelectChange = (e) => {
    setSelectedChart(e.target.value);
  };

  const handleEarningSelectChange = (e) => {
    setSelectedEarningChart(e.target.value);
  };

  return (
    <>
      <Flex
        marginBottom="5"
        marginLeft="150"
        direction="row"
        height="5px" // Adjust based on your header height
        px={[4, 6]}
        ml={{ base: "none", md: "40px" }}
      >

        <Box
        as={Link}
        to={"/Newbookinghistory"}
          position="relative"
          w={{ base: "80%", md: "20%" }}
          h={{ base: "25px", md: "150px" }}
          p={4}
          bg="white"
          border=" 3px solid #13C39C"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            Manager list
          </Text>
          <Text
            position="absolute"
            top="45px"
            
            fontWeight="bold"
            fontSize={40}
          >
            <NewBookingcount />
          </Text>
            <Icon
              as={FaList}
              position="absolute"
              color=" #13C39C"
              top="5px"
              right="5px"
            />
        </Box>


        <Box
          position="relative"
          w={{ base: "80%", md: "20%" }}
          h={{ base: "25px", md: "150px" }}
          p={4}
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
          border="3px solid #13C39C"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            Total Schedule booking
          </Text>
          <Icon
            as={FaBars}
            position="absolute"
            color=" #13C39C"
            top="5px"
            right="5px"
          />
          <Box mt={5} >
            <Activedrivercount />
          </Box>
        </Box>

        <Box
          position="relative"
          w={{ base: "80%", md: "20%" }}
          h={{ base: "25px", md: "150px" }}
          p={4}
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
          border="3px solid #13C39C"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            Total Balance
            <Text
            position="absolute"
            top="45px"
            left="10px"

            fontWeight="bold"
            fontSize={45}
          >
            <TotalBalance />
            </Text>
          </Text>
          <Icon
            as={IoPeople}
            position="absolute"
            color=" #13C39C"
            top="5px"
            right="5px"
          />
        </Box>

        <Box
          position="relative"
          w={{ base: "80%", md: "20%" }}
          h={{ base: "25px", md: "150px" }}
          p={4}
          bg="white"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
          mt={{ base: 10, md: 10 }}
          mr={{ base: 0, md: 4 }}
          borderRadius="10px"
          border="3px solid #13C39C"
        >
          <Text position="absolute" top="5px" left="5px" fontWeight="bold">
            Last 1 Month
          </Text>
          <Icon
            as={LuTarget}
            position="absolute"
            color=" #13C39C"
            top="5px"
            right="5px"
          />
        </Box>
      </Flex>

      <Flex
        flexDirection="row"
        mt={{ base: "none", md: "220px" }}
        ml={{ base: "none", md: "50px" }}
      >
        <Box width={"50%"}>
          <Select
            placeholder="Select Graph Type"
            width="200px"
            onChange={handleSelectChange}
            mr="4"
          >
            <option value="ScheduleBooking">Schedule Booking</option>
            <option value="RentalBooking">Rental Booking</option>
            <option value="TransportBooking">Transport Booking</option>
          </Select>
          {selectedChart === "ScheduleBooking" && <ScheduleBarChart />}
          {selectedChart === "RentalBooking" && <RentalBarChart />}
          {selectedChart === "TransportBooking" && <TransportBarChart />}
        </Box>

        <Box width={"50%"} mt={14}>
          <Select
            placeholder="Select Earning Graph"
            width="200px"
            onChange={handleEarningSelectChange}
            mr="4"
            mt={2}
          >
            <option value="ScheduleEarningChart">Schedule Earning Chart</option>
            <option value="RentalEarningChart">Rental Earning Chart</option>
            <option value="TransportEarningChart">Transport Earning Chart</option>
          </Select>
          {selectedEarningChart === "ScheduleEarningChart" && <ScheduleEarningChart />}
          {selectedEarningChart === "RentalEarningChart" && <RentalEarningChart />}
          {selectedEarningChart === "TransportEarningChart" && <TransportEarningChart />}
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
