import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";
export default function useEditCabin(editId) {
  const queryClient = useQueryClient();
  const {reset} = useForm();
  const {mutate:editCabin, isLoading:isEditing} = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin,editId),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({queryKey: ["cabins"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return {isEditing, editCabin};
}