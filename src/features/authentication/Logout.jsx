import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
function Logout(){
    const {logout,isPending} = useLogout()
   return <ButtonIcon onClick={logout} disabled={isPending}>
    <HiArrowRightOnRectangle />
    </ButtonIcon>
}
export default Logout