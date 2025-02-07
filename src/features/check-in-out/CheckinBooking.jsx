import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useState, useEffect } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSetting  from "../settings/useSetting";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {checkin, isCheckingIn} = useCheckin();
  const {booking, isLoading} = useBooking();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const {settings,isLoading: isLoadingSettings} = useSetting();
  useEffect(() => {
   setConfirmPaid(booking?.isPaid??false);
  }, [booking?.isPaid]);
  if(isLoading || isLoadingSettings) return <Spinner />;
  

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfastPrice = settings?.breakfastPrice*numGuests*numNights;
  function handleCheckin() {
    if(!confirmPaid) return;
    if(addBreakfast) {
      checkin({bookingId, breakfast:{
        hasBreakfast: true,
        extraPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      }});
    } else {
      checkin({bookingId, breakfast: {}});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

    <BookingDataBox booking={booking} />
    {!hasBreakfast && <Box>
      <Checkbox checked={addBreakfast} 
      onChange={() => {setAddBreakfast((add) => !add)
      setConfirmPaid(false);
    }}
      id="breakfast"
      >
        Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
      </Checkbox>
    </Box>}
<Box>
  <Checkbox checked={confirmPaid} onChange={() => setConfirmPaid(!confirmPaid)} 
  id="confirm" disabled={confirmPaid || isCheckingIn}
  >
    I confirm that {guests.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : formatCurrency(totalPrice + optionalBreakfastPrice)}
  </Checkbox>
</Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
