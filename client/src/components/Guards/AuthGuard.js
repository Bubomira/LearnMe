import { useContext } from "react";

import { Navigate,Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export default function AuthGuard(){
    const {user} = useContext(AuthContext);

    if(!user.token){
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>

}