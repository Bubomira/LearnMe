import { useState } from "react";

const key = 'user';

export default function useLocalStorageAuth(defaultValue){
    const [user,setUser] = useState(()=>{
        const localStorageData = localStorage.getItem(key);
        return localStorageData? JSON.parse(localStorageData) : defaultValue
    })

    const setLocalStorageItem = (newUser)=>{
        localStorage.setItem(key,JSON.stringify(newUser))
        setUser(newUser)
    }

    return [
        user,
        setLocalStorageItem
    ];
}