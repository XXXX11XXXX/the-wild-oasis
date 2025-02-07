import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const{mutate: checkin, isLoading: isCheckingIn} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId,{
            status: "checked-in",
            isPaid: true,
            ...breakfast && {hasBreakfast: true},
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({queryKey: ["bookings"]});
            navigate("/");
        },
        onError: (error) => toast.error(error.message),
    });
    return {checkin, isCheckingIn};
}
