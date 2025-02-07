import { useMutation } from "@tanstack/react-query";
import { signup as signupApi} from "../../services/apiAuth";
import { toast } from "react-hot-toast";
export function useSignup(){
  const {mutate:signup,isPending} = useMutation({
    mutationFn:signupApi,
    onSuccess:(user)=>{
      toast.success("Account successfully created! Please verify your email address.")
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
  return {signup,isPending}
}
