import Button from "../../ui/Button";
import { useCheckin } from "./useCheckin";
function CheckinButton({bookingId}){
  const {checkin,isCheckingin} = useCheckin();
  return (
    <Button size="small" onClick={()=>checkin(bookingId)} disabled={isCheckingin}>Check in</Button>
  )
}

export default CheckinButton;