import {
  Box,
  ChakraProvider,
  extendTheme,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Extend the Chakra UI theme to include a custom color for the max count bar
const theme = extendTheme({
  colors: {
    primary: {
      500: "#D7D7D7", // Blue for the Saturday bar
      300: "#D7D7D7", // Gray for the other bars
    },
  },
});

function ScheduleBarChart() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/list-all-BookingGraph"
      );
      console.log("API Response:", response.data); // Log the API response
      setData(response.data); // Adjust this line based on the actual API response structure
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error); // Log the error
      setError("Error fetching data. Please try again.");
    }
  };

  const processChartData = (data) => {
    if (!data) return [];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dateCountsMap = data.reduce((acc, item) => {
      const startDate = new Date(item.startDateTime); // Adjust this line based on the actual API response structure
      const dayOfWeek = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)
      const dayName = daysOfWeek[dayOfWeek];
      acc[dayName] = (acc[dayName] || 0) + 1;
      return acc;
    }, {});

    // Ensure all days of the week are represented in the data
    daysOfWeek.forEach((day) => {
      if (!dateCountsMap[day]) {
        dateCountsMap[day] = 0;
      }
    });

    const formattedData = daysOfWeek.map((day) => ({
      dayOfWeek: day,
      count: dateCountsMap[day],
    }));

    return formattedData;
  };

  const formattedData = processChartData(data);

  return (
    <ChakraProvider theme={theme}>
      <Heading size="md" mt={5}>
        Schedule booking Chart
      </Heading>
      <Box
        p="4"
        bg="gray.100"
        borderRadius="md"
        boxShadow="md"
        w="90%"
        h="400px"
        mt="60px"
        mx="auto"
        border="2px solid #13C39C"
      >
        {error && <Box color="red.500">{error}</Box>}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dayOfWeek" />
            <YAxis>
              <Label
                value="Count"
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip />
            <Bar dataKey="count">
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.dayOfWeek === "Sat" ? "#0094FF" : "#D7D7D7"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChakraProvider>
  );
}

export default ScheduleBarChart;
