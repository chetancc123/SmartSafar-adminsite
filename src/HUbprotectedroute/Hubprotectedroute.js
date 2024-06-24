import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HubLogin from "../Components/Login/Adminlogin";

import Dashboard from "../Components/Dashboard";
import PrivateRoute from "../Privateroute/Privateroute";
import Home from "../Components/Home";

import Management from "../Components/Management/Management";
import Bankpayment1 from "../Components/Bankpayment1";
import Carlist from "../Components/Carlist";
import Booking from "../Components/Booking/Booking";
import Settings from "../Components/Settings";
import Driverlist from "../Components/driver/Driverlist";
import Transport from "../Components/Transport/Transport";
import Assigningdriver from "../Components/driver/Asiigningdriver";
import Runningcar from "../Components/Runningcar";
import Returncar from "../Components/Returncar";
import Chargecar from "../Components/Chargcar";
import Newbookinghistory from "../Components/Booking/Newbookinghistory";
import Todaybookinghistory from "../Components/Todaybookinghistory";
import Todaynewbookinghistory from "../Components/Todaynewbookinghistory";
import Newbookingdetails from "../Components/Booking/Newbookingdetails";
import LoginSecurity from "../Components/LoginSecurity";
import Activedriver from "../Components/driver/Activedriver";
import Totallist from "../Components/Totallist";
import Driverdetail from "../Components/driver/Driverdetail";
import Activebooking from "../Components/Booking/Activebooking";
import Assignedcar from "../Components/Assignedcar";
import ExactRepairAmount from "../Components/ExactRepairAmount";
import Carmaintance from "../Components/Transport/Carmaintance";
import Employeepending from "../Components/Payment/Employeepending";
import Managermanagemant from "../Components/Management/Managermanagemant";
import Totalrepairingcost from "../Components/Toatalrepairingcostthismonth";

import CarForRepairing from "../Components/Management/CarForRepairing";

import RequestforRepair from "../Components/RequestforRepair";
import Approveddriverlisttransport from "../Components/Transport/Approveddriverlisttransport";
import TransportDriverDetails from "../Components/Transport/TransportDriverDetails";
import TransportApprovedDriverDetails from "../Components/Transport/TransportApprovedDriverDetails";
import TransportRequestDriver from "../Components/Transport/TransportRequestDriver";
import Ebikelist from "../Components/E-bike/Ebikelist";
import BookingHome from "../Components/Booking/BookingHome";
import { AuthContext } from "../AuthContext/Authcontext";
import Sidebar from "../Components/Sidebar";
import { Box } from "@chakra-ui/react";

import TransportHome from "../Components/Transport/TransportHome";
import TransportHome1 from "../Components/Transport/TransportHome";
import ApprovedFourWheelerTransportdriver from "../Components/Transport/ApprovedFourWheelerTransportdriver";
import ApprovedTwoWheelerTransportdriver from "../Components/Transport/ApprovedTwoWheelerTransportdriver";
import NewtransportdriverFourWheeler from "../Components/Transport/NewTransportDriverFourWheeler";
import NewtransportdrivertwoWheeler from "../Components/Transport/NewtransportdrivertwoWheeler";
import ApprovedDetailFourWheelerDriver from "../Components/Transport/ApprovedDetailFourWheelerDriver";
import ApprovedDetailTwoWheelerDriver from "../Components/Transport/ApprovedDetailTwoWheelerDriver";
import PendingDetailDriverTwoWheeler from "../Components/Transport/PendingDetailDriverTwoWheeler";
import PendingDetailDriverFourWheeler from "../Components/Transport/PendingDetailDriverFourWheeler";
import SelectedCarsPage from "../Components/Vehicle/Selectedvehicle";
import VehicleHome from "../Components/Vehicle/VehicleHome";

import AssignedVehicle from "../Components/Vehicle/AssignedVehicle";
import Hubhome from "../Components/Hub/Hubhome";
import Activemanagerdetail from "../Components/Hub/Activemanagerdetail";
import Hublistdetail from "../Components/Hub/Hublistdetail";
import EmployeePayment from "../Components/Hub/Employeepayment";
import EmployeePayment1 from "../Components/Hub/Employeepayment";
import DriverPayment1 from "../Components/Hub/DriverPayment";
import Carmaintainance from "../Components/Hub/Carmaintainanace";
import MaintenanceHome from "../Components/Maintanance/MaintenanceHome";
import AddVehicleHome from "../Components/Add vehicle/AddVehicleHome";

import Addcar1 from "../Components/Add vehicle/AddVehicle";
import Addebike from "../Components/Add vehicle/AddE-bike";
import Carmaintainancedetail from "../Components/Maintanance/Carmaintainancedetail";
import Paymentdetails from "../Components/Payment/Paymentdetails";
import Paymentsection from "../Components/Payment/paymentsection";
import Payment from "../Components/Payment/payment";
import DriverPaymentDetail from "../Components/Payment/Driverpaymentdetail";
import AdminSignup from "../Components/Login/AdminSignup";
// Import other components/pages here...

const HubProtectedRoute = ({ userEmail }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated && <Home />}
      <Box w={"80%"} mt={"5%"}>
        <Routes>
          {/* <Route path="/" element={ <PrivateRoute><Home /> </PrivateRoute>} /> */}

          <Route path="/" element={<HubLogin />} />
          {/* <Route path="/Home" element={< Home/>} /> */}
          <Route path="/AdminSignup" element={<AdminSignup />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/Management"
            element={
              <PrivateRoute>
                <Management />
              </PrivateRoute>
            }
          />
          <Route
            path="/Paymentsection"
            element={
              <PrivateRoute>
                <Paymentsection />
              </PrivateRoute>
            }
          />
          <Route
            path="/Bankpayment1"
            element={
              <PrivateRoute>
                <Bankpayment1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/Carlist"
            element={
              <PrivateRoute>
                <Carlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/Setting"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/driverlist"
            element={
              <PrivateRoute>
                <Driverlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/Transport"
            element={
              <PrivateRoute>
                <Transport />
              </PrivateRoute>
            }
          />
          <Route
            path="/Assigningdriver"
            element={
              <PrivateRoute>
                <Assigningdriver />
              </PrivateRoute>
            }
          />
          <Route
            path="/Runningcar"
            element={
              <PrivateRoute>
                <Runningcar />
              </PrivateRoute>
            }
          />
          <Route
            path="/Returncar"
            element={
              <PrivateRoute>
                <Returncar />
              </PrivateRoute>
            }
          />
          <Route
            path="/Chargecar"
            element={
              <PrivateRoute>
                <Chargecar />
              </PrivateRoute>
            }
          />
          <Route
            path="/Newbookinghistory"
            element={
              <PrivateRoute>
                <Newbookinghistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/Todaybookinghistory"
            element={
              <PrivateRoute>
                <Todaybookinghistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/Todaynewbookinghistory"
            element={
              <PrivateRoute>
                <Todaynewbookinghistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/Newbookingdetails"
            element={
              <PrivateRoute>
                <Newbookingdetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/LoginSecurity"
            element={
              <PrivateRoute>
                <LoginSecurity />
              </PrivateRoute>
            }
          />
          <Route
            path="/Activedriver"
            element={
              <PrivateRoute>
                <Activedriver />
              </PrivateRoute>
            }
          />
          <Route
            path="/Totallist"
            element={
              <PrivateRoute>
                <Totallist />
              </PrivateRoute>
            }
          />
          <Route
            path="/Driverdetail/:driverId"
            element={
              <PrivateRoute>
                <Driverdetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/Activebooking"
            element={
              <PrivateRoute>
                <Activebooking />
              </PrivateRoute>
            }
          />
          <Route
            path="/Assignedcar"
            element={
              <PrivateRoute>
                <Assignedcar />
              </PrivateRoute>
            }
          />
          <Route
            path="/ExactRepairAmount"
            element={
              <PrivateRoute>
                <ExactRepairAmount />
              </PrivateRoute>
            }
          />
          <Route
            path="/Carmaintance"
            element={
              <PrivateRoute>
                <Carmaintance />
              </PrivateRoute>
            }
          />
         

          <Route
            path="/Employeepending"
            element={
              <PrivateRoute>
                <Employeepending />
              </PrivateRoute>
            }
          />
        
     

          <Route
            path="/Managermanagemant"
            element={
              <PrivateRoute>
                <Managermanagemant />
              </PrivateRoute>
            }
          />
          <Route path="/Payment" element={<PrivateRoute><Payment/></PrivateRoute>}/>
          <Route
            path="/Totalrepairingcost"
            element={
              <PrivateRoute>
                <Totalrepairingcost />
              </PrivateRoute>
            }
          />

          <Route
            path="/CarForRepairing"
            element={
              <PrivateRoute>
                <CarForRepairing />
              </PrivateRoute>
            }
          />

          <Route
            path="/RequestforRepair/:carRepairId"
            element={
              <PrivateRoute>
                <RequestforRepair />
              </PrivateRoute>
            }
          />
          <Route
            path="/Driverpaymentdetail/:driverPaymentDetailId"
            element={<DriverPaymentDetail />}
          />
          <Route
            path="/BookingHome"
            element={
              <PrivateRoute>
                <BookingHome />
              </PrivateRoute>
            }
          />

          <Route
            path="/Ebikelist"
            element={
              <PrivateRoute>
                <Ebikelist />
              </PrivateRoute>
            }
          />
          <Route
            path="/TransportRequestDriver"
            element={
              <PrivateRoute>
                <TransportRequestDriver />
              </PrivateRoute>
            }
          />
          <Route
            path="/TransportApprovedDriverDetails"
            element={
              <PrivateRoute>
                <TransportApprovedDriverDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/Approveddriverlisttransport"
            element={
              <PrivateRoute>
                <Approveddriverlisttransport />
              </PrivateRoute>
            }
          />
          <Route
            path="/TransportDriverDetails"
            element={
              <PrivateRoute>
                <TransportDriverDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/TransportHome"
            element={
              <PrivateRoute>
                <TransportHome1 />
              </PrivateRoute>
            }
          />

          <Route
            path="/ApprovedFourWheelerTransportdriver"
            element={
              <PrivateRoute>
                <ApprovedFourWheelerTransportdriver />
              </PrivateRoute>
            }
          />

          <Route
            path="/ApprovedTwoWheelerTransportdriver"
            element={
              <PrivateRoute>
                <ApprovedTwoWheelerTransportdriver />
              </PrivateRoute>
            }
          />
          <Route
            path="/NewtransportdriverFourWheeler"
            element={
              <PrivateRoute>
                <NewtransportdriverFourWheeler />
              </PrivateRoute>
            }
          />
          <Route
            path="/NewtransportdrivertwoWheeler"
            element={
              <PrivateRoute>
                <NewtransportdrivertwoWheeler />
              </PrivateRoute>
            }
          />

          <Route
            path="/ApprovedDetailFourWheelerDriver/:id"
            element={
              <PrivateRoute>
                <ApprovedDetailFourWheelerDriver />
              </PrivateRoute>
            }
          />
          <Route
            path="/ApprovedDetailTwoWheelerDriver/:id"
            element={
              <PrivateRoute>
                <ApprovedDetailTwoWheelerDriver />
              </PrivateRoute>
            }
          />

          <Route
            path="/PendingDetailDriverTwoWheeler/:id"
            element={
              <PrivateRoute>
                <PendingDetailDriverTwoWheeler />
              </PrivateRoute>
            }
          />

          <Route
            path="/PendingDetailDriverFourWheeler/:id"
            element={
              <PrivateRoute>
                <PendingDetailDriverFourWheeler />
              </PrivateRoute>
            }
          />
          <Route
            path="/SelectedCarsPage"
            element={
              <PrivateRoute>
                <SelectedCarsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/VehicleHome"
            element={
              <PrivateRoute>
                <VehicleHome />
              </PrivateRoute>
            }
          />

          <Route
            path="/AssignedVehicle"
            element={
              <PrivateRoute>
                <AssignedVehicle />
              </PrivateRoute>
            }
          />
          <Route
            path="/Hubhome"
            element={
              <PrivateRoute>
                <Hubhome />
              </PrivateRoute>
            }
          />
          <Route
            path="/Activemanagerdetail/:hubId"
            element={
              <PrivateRoute>
                <Activemanagerdetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/Hublistdetail"
            element={
              <PrivateRoute>
                <Hublistdetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/EmployeePayment1"
            element={
              <PrivateRoute>
                <EmployeePayment1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/DriverPayment1"
            element={
              <PrivateRoute>
                <DriverPayment1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/Carmaintainance"
            element={
              <PrivateRoute>
                <Carmaintainance />
              </PrivateRoute>
            }
          />

          <Route
            path="/Carmaintainancedetail/:carRepairId"
            element={
              <PrivateRoute>
                <Carmaintainancedetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/MaintenanceHome"
            element={
              <PrivateRoute>
                <MaintenanceHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/AddVehicleHome"
            element={
              <PrivateRoute>
                <AddVehicleHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/Addcar1"
            element={
              <PrivateRoute>
                <Addcar1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/Addebike"
            element={
              <PrivateRoute>
                <Addebike />
              </PrivateRoute>
            }
          />

          <Route
            path="/Paymentdetails/:employeeOrderId"
            element={<Paymentdetails />}
          />
         
        </Routes>
      </Box>
    </>
  );
};

export default HubProtectedRoute;
