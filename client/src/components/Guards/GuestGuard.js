import { useContext } from "react";

import { Navigate,Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export default function GuestGuard(){
    const {user} = useContext(AuthContext);
    if(user.token){
        return <Navigate to='/404' replace/>
    }

    return <Outlet/>
}