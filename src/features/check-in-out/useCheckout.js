import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const{mutate: checkout, isLoading: isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId,{
            status: "checked-out",
            
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({queryKey: ["bookings"]});
            
        },
        onError: (error) => toast.error(error.message),
    });
    return {checkout, isCheckingOut};
}
