// App.js
import React, { useContext } from "react";
import { Routes, Route, Router } from "react-router-dom";
import HubProtectedRoute from "./HUbprotectedroute/Hubprotectedroute";

import { Flex } from "@chakra-ui/react";
import Navbar1 from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import VehicleHome from "./Components/Vehicle/VehicleHome";
import Managermanagemant from "./Components/Management/Managermanagemant";
import Management from "./Components/Management/Management";

const App = () => {
  return (
    <Flex>
      <HubProtectedRoute />
      {/* <VehicleHome/> */}
      {/* <Managermanagemant/> */}
    </Flex>
  );
};

export default App;
