import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";

import { logout } from "../../../services/authServises";


export default function Logout(){
     const navigate = useNavigate();

     const { logoutUser} = useContext(AuthContext);

     logout().then(()=>{
        logoutUser();
        navigate('/')
     })
     .catch(err=>{
        console.log(err.message)
     })
}