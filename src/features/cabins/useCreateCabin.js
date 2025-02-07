import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const {reset} = useForm();
  const {mutate:createCabin, isLoading:isCreating} = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({queryKey: ["cabins"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  
  return {isCreating, createCabin};
}