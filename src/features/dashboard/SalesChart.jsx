import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  eachDayOfInterval,
  format,
  isEqual,
  isSameDay,
  subDays,
} from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extraSales: 20 },
  { label: "Jan 10", totalSales: 580, extraSales: 100 },
  { label: "Jan 11", totalSales: 550, extraSales: 150 },
  { label: "Jan 12", totalSales: 600, extraSales: 50 },
  { label: "Jan 13", totalSales: 700, extraSales: 150 },
  { label: "Jan 14", totalSales: 800, extraSales: 150 },
  { label: "Jan 15", totalSales: 700, extraSales: 200 },
  { label: "Jan 16", totalSales: 650, extraSales: 200 },
  { label: "Jan 17", totalSales: 600, extraSales: 300 },
  { label: "Jan 18", totalSales: 550, extraSales: 100 },
  { label: "Jan 19", totalSales: 700, extraSales: 100 },
  { label: "Jan 20", totalSales: 800, extraSales: 200 },
  { label: "Jan 21", totalSales: 700, extraSales: 100 },
  { label: "Jan 22", totalSales: 810, extraSales: 50 },
  { label: "Jan 23", totalSales: 950, extraSales: 250 },
  { label: "Jan 24", totalSales: 970, extraSales: 100 },
  { label: "Jan 25", totalSales: 900, extraSales: 200 },
  { label: "Jan 26", totalSales: 950, extraSales: 300 },
  { label: "Jan 27", totalSales: 850, extraSales: 200 },
  { label: "Jan 28", totalSales: 900, extraSales: 100 },
  { label: "Jan 29", totalSales: 800, extraSales: 300 },
  { label: "Jan 30", totalSales: 950, extraSales: 200 },
  { label: "Jan 31", totalSales: 1100, extraSales: 300 },
  { label: "Feb 01", totalSales: 1200, extraSales: 400 },
  { label: "Feb 02", totalSales: 1250, extraSales: 300 },
  { label: "Feb 03", totalSales: 1400, extraSales: 450 },
  { label: "Feb 04", totalSales: 1500, extraSales: 500 },
  { label: "Feb 05", totalSales: 1400, extraSales: 600 },
  { label: "Feb 06", totalSales: 1450, extraSales: 400 },
];

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allData = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allData.map((i) => ({
    label: format(i, "MMM dd"),
    totalSales: bookings
      .filter((b) => isSameDay(i, new Date(b.created_at)))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extraSales: bookings
      .filter((b) => isSameDay(i, new Date(b.created_at)))
      .reduce((acc, cur) => acc + cur.extraPrice, 0),
  }));
  return (
    <StyledSalesChart>
      <Heading as="h2">
        {" "}
        Sales from {format(allData[0], "MMMM dd yyyy")} &mdash;{" "}
        {format(allData.at(-1), "MMMM dd yyyy")}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            dataKey="label"
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit={"$"}
          />
          <CartesianGrid strokeDasharray={"4"} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            name="Total sales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            unit={"$"}
          />
          <Area
            type="monotone"
            dataKey="extraSales"
            name="Extras sales"
            stroke={colors.extraSales.stroke}
            fill={colors.extraSales.fill}
            strokeWidth={2}
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
