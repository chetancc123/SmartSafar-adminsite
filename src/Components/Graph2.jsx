import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Flex, Button } from "@chakra-ui/react";

const Graph2 = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [graphType, setGraphType] = useState("daily");

  useEffect(() => {
    fetchData();
  }, [graphType]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hub/get-rental-booking-details/1`
      );
      setData(response.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Error fetching data. Please try again.");
    }
  };

  if (!Array.isArray(data)) {
    return <div>Error: data is not an array</div>;
  }

  const aggregateData = (interval) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dateCountsMap = data.reduce((acc, item) => {
      let date;
      if (interval === "daily") {
        const dayOfWeekIndex = new Date(item.timeDuration.startDateTime).getDay();
        date = dayNames[dayOfWeekIndex];
      } else if (interval === "weekly") {
        const year = new Date(item.timeDuration.startDateTime).getFullYear();
        const weekNumber = getWeekNumber(new Date(item.timeDuration.startDateTime));
        date = `${year}-W${weekNumber}`;
      } else if (interval === "monthly") {
        date = new Date(item.timeDuration.startDateTime).toLocaleString('default', { month: 'short', year: 'numeric' });
      }
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  
    // Construct an array of objects with date and counts
    const graphDataArray = Object.keys(dateCountsMap).map(date => ({
      date,
      count: dateCountsMap[date]
    }));
  
    return graphDataArray;
  };
  
  // Function to get the week number of a date
  const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  };
  
  
  

  const handleIntervalChange = (interval) => {
    setGraphType(interval);
  };

  return (
    <div>
      <h1>Rental Bookings</h1>
      <Flex>
        <Button
          colorScheme={graphType === "daily" ? "blue" : "gray"}
          onClick={() => handleIntervalChange("daily")}
          mr={2}
        >
          Daily
        </Button>
        <Button
          colorScheme={graphType === "weekly" ? "blue" : "gray"}
          onClick={() => handleIntervalChange("weekly")}
          mr={2}
        >
          Weekly
        </Button>
        <Button
          colorScheme={graphType === "monthly" ? "blue" : "gray"}
          onClick={() => handleIntervalChange("monthly")}
        >
          Monthly
        </Button>
      </Flex>
      {data.length > 0 && (
        <LineChart width={500} height={300} data={aggregateData(graphType)}>
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
        </LineChart>
      )}
    </div>
  );
};

export default Graph2;
