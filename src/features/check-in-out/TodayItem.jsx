import styled from "styled-components";
import Tag from "../../ui/Tag";
import CheckinButton from "./CheckinButton";
import CheckoutButton from "./CheckoutButton";
// import Flag from "../../ui/Flag";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr auto;
  gap: 2.4rem;
  align-items: center;
  
  padding: 1.2rem 0;
  
  border-bottom: 1px solid var(--color-grey-100);
  
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
  color: var(--color-grey-600);
`;

const StyledDuration = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-grey-600);
  margin-left: auto;
`;

function TodayItem({activity}){
  const {guests, numNights, status, id:bookingId} = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">ARRIVING</Tag>}
      {status === "checked-in" && <Tag type="blue">DEPARTING</Tag>}
      {/* <Flag src={guest.countryFlag} alt={`${guest.country} flag`} /> */}
      <Guest>{guests?.fullName}</Guest>
      <StyledDuration>{numNights} nights</StyledDuration>
      {status === "unconfirmed" && <CheckinButton bookingId={bookingId} />}
      {status === "checked-in" && <CheckoutButton bookingId={bookingId} />}
    </StyledTodayItem>
  )
}

export default TodayItem;