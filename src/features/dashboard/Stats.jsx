import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import { HiOutlineCalendarDays, HiOutlineCurrencyDollar, HiOutlineCheckCircle, HiOutlineUserGroup } from "react-icons/hi2";

function Stats({bookings, confirmedStays, numDays, cabinCount}){
    const sales=bookings.reduce((acc,cur)=>acc+cur.totalPrice,0)
    const checkIns=confirmedStays.length
    const occupation = confirmedStays.reduce((acc,cur)=>acc+cur.numNights,0)/(cabinCount*numDays)
    return <>
    <Stat title="bookings" color="blue" icon={<HiOutlineCalendarDays/>} value={numDays} />
    <Stat title="sales" color="green" icon={<HiOutlineCurrencyDollar/>} value={formatCurrency(sales)} />
    <Stat title="check-ins" color="indigo" icon={<HiOutlineCheckCircle/>} value={checkIns} />
    <Stat title="occupation" color="violet" icon={<HiOutlineUserGroup/>} value={occupation.toFixed(2)} />
    </>
}
export default Stats