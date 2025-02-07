import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  
  const {isLoading:isDeleting, mutate:deleteBooking} = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    
    },
    onError: (err) => {
      console.log("Error deleting booking", err);
      toast.error("Error deleting booking");
    },
  });
  return {isDeleting, deleteBooking};
}