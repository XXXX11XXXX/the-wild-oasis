import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, isSameDay, subDays, format } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  console.log(bookings)
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const extrasSales = bookings.reduce((acc, cur) => acc + cur.extrasPrice, 0);

  const data = allDays.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });
  console.log(data)
  const colors = isDarkMode
  ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };
  return <StyledSalesChart>
    <Heading as="h2">Sales from {format(allDays[0], "MMM dd yyyy")} to {format(allDays[allDays.length - 1], "MMM dd yyyy")}</Heading>
    <ResponsiveContainer height={300} width="100%">
      <AreaChart 
        data={data}
        margin={{ left: 65, right: 20, top: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="4" />
        <XAxis dataKey="label" tick={{fill:colors.text}} tickLine={false} />
        <YAxis 
          unit="$" 
          tick={{fill:colors.text}} 
          tickLine={false}
          domain={[0, 'auto']}
          allowDataOverflow={true}
          interval="preserveStartEnd"
        />
        <Tooltip contentStyle={{backgroundColor:colors.background, fontSize:12}}/>
        <Area 
          dataKey="totalSales" 
          type='monotone' 
          stroke={colors.totalSales.stroke} 
          fill={colors.totalSales.fill} 
          name="Total Sales"
          unit="$"
        />
        <Area 
          dataKey="extrasSales" 
          type='monotone' 
          stroke={colors.extrasSales.stroke} 
          fill={colors.extrasSales.fill} 
          name="Extras Sales"
          unit="$"
        />
      </AreaChart>
    </ResponsiveContainer>
  </StyledSalesChart>
}
export default SalesChart