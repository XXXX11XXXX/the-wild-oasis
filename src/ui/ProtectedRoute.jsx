import { useUser } from "../features/authentication/useUser";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";
const FullPage=styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`
export default function ProtectedRoute({children}){
    const navigate = useNavigate()
    const {isAuthenticated,isLoading} = useUser()
    useEffect(()=>{
        if(!isAuthenticated&&!isLoading) navigate("/login",{replace:true})
    },[isAuthenticated,navigate,isLoading])
    if(isLoading) return <FullPage><Spinner /></FullPage>
    
    return children
}