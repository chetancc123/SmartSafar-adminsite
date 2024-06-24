import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";import { Flex, Box, Input, Image, Grid, Button } from "@chakra-ui/react";

const DriverPaymentDetail = () => {
  const { driverPaymentDetailId } = useParams();
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [paymentData, setPaymentData] = useState({
    driver: {
      name: "",
      email: "",
      phoneNo: "",
      address: "",
    },
    amount: "",
  });

  const [selectedImage, setSelectedImage] = useState(null); // Define selectedImage state
  const [isOpen, setIsOpen] = useState(false); // Define isOpen state

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    setIsOpen(true); // Open modal after form submission
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Razorpay SDK is loaded, you can now use it
      const rzp = new window.Razorpay({
        key: "rzp_test_7uOZSUAOJBrYul",
        // other configuration options
      });
    };
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/pending-driver/${driverPaymentDetailId}`
        );
        console.log(response);
        setPaymentData(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, [driverPaymentDetailId]);

  const onClose = () => {
    setIsOpen(false); // Close modal
  };

  const handlePayment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/pending-driver/${driverPaymentDetailId}`
      );
      const { driver, hub, amount } = response.data;
      const driverId = driver.driverId;
      const hubId = hub.hubId;

      const createOrderResponse = await axios.post(
        `http://localhost:8080/payment/order_intialisedhub/${driverId}/${hubId}`,
        { amount: amount }
      );
      // console.log(createOrderResponse.data);
      console.log(createOrderResponse.data.id);

      if (createOrderResponse.status === 200) {
        const razorpay_order_id = createOrderResponse.data.id;
        const options = {
          key: "rzp_test_7uOZSUAOJBrYul",
          amount: amount * 100,
          currency: "INR",
          name: "Your Company Name",
          description: "Payment for Order",
          order_id: razorpay_order_id,
          prefill: {
            name: driver.name,
            email: driver.email,
            contact: driver.phoneNo,
          },
          notes: {
            address: driver.address,
          },
          handler: async function (response) {
            try {
              if (response.razorpay_payment_id) {
                const updateResponse = await axios.post(
                  "http://localhost:8080/payment/driverPaymentUpdate",
                  {
                    orderId: razorpay_order_id,
                    status: "paid",
                    paymentId: response.razorpay_payment_id,
                  }
                );
                if (updateResponse.status === 200) {
                  console.log("Payment successful");
                  navigate("/Paymentsection"); // Redirect to Paymentsection after success
                } else {
                  console.error(
                    "Error updating payment status:",
                    updateResponse.data
                  );
                }
              } else {
                console.error("Payment not successful:", response.error);
              }
            } catch (error) {
              console.error("Error updating payment status:", error);
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="row">
        <Box
          justify="center"
          align="center"
          direction="row"
          height="5px"
          px={[4, 6]}
          left={10}
        ></Box>
      </Flex>
      <Input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Box ml={300} mt={10}>
        <Image
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ec2d05f0c8c6e70040bb612e93ccca83669cd9d67d5bff4396c76cbcc20793e?apiKey=6e819305aff14a71a524c5abb40332f8&"
          alt="Driver icon"
          className="w-16 aspect-[0.85]"
        />
      </Box>
      <Flex
        justify="center"
        align="center"
        direction="row"
        height="5px"
        px={[4, 6]}
      >
        <Flex
          bg="white.100"
          p={6}
          borderRadius="md"
          boxShadow="md"
          mb={4}
          marginTop="600px"
          marginRight="40px"
          ml={{ base: "none", md: "50px" }}
          height="400px"
          width="1000px"
          border="3px solid #13C39C"
          flexDirection="column"
          py={5}
          pr={2}
          rounded="2xl"
          borderColor="blue.600"
          borderOpacity="0.8"
        >
          <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
            <Input
              placeholder="Driver Name"
              name="name"
              value={paymentData.driver.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Email Address"
              name="email"
              value={paymentData.driver.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid templateColumns="1fr 1fr" gap={4} paddingTop={10}>
            <Input
              placeholder="Phone Number"
              name="phoneNo"
              value={paymentData.driver.phoneNo}
              onChange={handleChange}
            />
            <Input
              placeholder="amount"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
            />
            {/* <Input placeholder="Hub Name" name="hubName" value={paymentData.hub.hubName} readOnly /> */}
          </Grid>
          <Flex justifyContent="space-between" mt={120} ml={350}>
            <Button colorScheme="orange" size="lg" onClick={handlePayment}>
              Do Payment
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default DriverPaymentDetail;
