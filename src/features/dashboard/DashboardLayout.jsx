import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import  Spinner  from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
const DashboardLayout = ({children}) => {
  const {bookings = [], isLoading:isLoadingBookings, error:errorBookings} = useRecentBookings();
  const {stays = [], isLoading:isLoadingStays, error:errorStays, confirmedStays = [], numDays = 7} = useRecentStays();
  const {data: cabins = [], isLoading:isLoadingCabins, error:errorCabins} = useCabins();
  
  if(isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;
  if(errorBookings || errorStays || errorCabins) return <p>There was an error fetching activity...</p>;
  
  // if(!cabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats 
        bookings={bookings} 
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
export default DashboardLayout