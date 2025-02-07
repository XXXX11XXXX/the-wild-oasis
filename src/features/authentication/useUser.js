import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser(){
    const {data:user,isLoading} = useQuery({
        queryKey:["user"],
        queryFn: getCurrentUser,  // 修改1：移除括号
        staleTime: Infinity,      // 修改2：增加 staleTime
        retry: false             // 修改3：禁用重试
    })
    return {
        user,
        isLoading,
        isAuthenticated: user?.role === "authenticated"  // 修改4：更精确的认证检查
    }
}