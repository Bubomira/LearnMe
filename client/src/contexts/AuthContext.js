import { createContext } from "react";

import useLokalStorageAuth from '../hooks/useLokalStorageAuth'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    let [user,setUser] =useLokalStorageAuth({});

    const loginUser = (newUser)=>{
        setUser(newUser);
    }

    const logoutUser =()=>{
        setUser({});
    }

    return (
    <AuthContext.Provider  value={{user:user, loginUser, logoutUser }}>
         {children}
    </AuthContext.Provider>
    )
}