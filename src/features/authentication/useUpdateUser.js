import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "./UpdateUserDataForm";
import { useForm } from "react-hook-form";
import { useUser } from "./useUser";
export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const {reset} = useForm();
  const {mutate:updateUser, isLoading:isUpdating} = useMutation({
    mutationFn: (newUser) => updateCurrentUser(newUser),
    onSuccess: (newUser) => {
      toast.success("User successfully updated");
      queryClient.setQueryData(["user"],newUser);
    //   queryClient.invalidateQueries({queryKey: ["user"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return {isUpdating, updateUser};
}