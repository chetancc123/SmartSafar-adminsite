import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const ScheduleEarningChart = () => {
  const [interval, setInterval] = useState("daily");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8080/admin/list-all-BookingGraph";
        const response = await axios.get(url);
        const data = response.data;

        let formattedData = [];
        if (interval === "daily") {
          const dailyData = data.reduce((acc, item) => {
            const day = dayjs(item.startDateTime).format("dddd");
            if (!acc[day]) {
              acc[day] = 0;
            }
            acc[day] += item.totalAmount;
            return acc;
          }, {});

          formattedData = Object.keys(dailyData).map((key) => ({
            date: key,
            value: dailyData[key],
          }));
        } else if (interval === "weekly") {
          const weeklyData = data.reduce((acc, item) => {
            const week = dayjs(item.startDateTime).isoWeek();
            if (!acc[week]) {
              acc[week] = 0;
            }
            acc[week] += item.totalAmount;
            return acc;
          }, {});

          formattedData = Object.keys(weeklyData).map((key) => ({
            date: `Week ${key}`,
            value: weeklyData[key],
          }));
        } else if (interval === "monthly") {
          const monthlyData = data.reduce((acc, item) => {
            const month = dayjs(item.startDateTime).format("MMMM");
            if (!acc[month]) {
              acc[month] = 0;
            }
            acc[month] += item.totalAmount;
            return acc;
          }, {});

          formattedData = Object.keys(monthlyData).map((key) => ({
            date: key,
            value: monthlyData[key],
          }));
        }

        setChartData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [interval]);

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mt={"29.7px"}>
        <Heading size="md">Earnings Chart</Heading>
        <Flex>
          <Button
            variant={interval === "daily" ? "solid" : "outline"}
            onClick={() => handleIntervalChange("daily")}
            mr={2}
          >
            Daily
          </Button>
          <Button
            variant={interval === "weekly" ? "solid" : "outline"}
            onClick={() => handleIntervalChange("weekly")}
            mr={2}
          >
            Weekly
          </Button>
          <Button
            variant={interval === "monthly" ? "solid" : "outline"}
            onClick={() => handleIntervalChange("monthly")}
          >
            Monthly
          </Button>
        </Flex>
      </Flex>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ScheduleEarningChart;
