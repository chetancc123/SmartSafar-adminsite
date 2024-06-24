// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./AuthContext/Authcontext";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
    
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
