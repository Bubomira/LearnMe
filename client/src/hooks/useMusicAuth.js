import { useState } from "react";
import { getAccessToken } from "../services/musicServices";

export default function useMusicAuth(defaultValue){

    let [musicToken,setMusicToken] = useState(()=>{
        const localStorageData = localStorage.getItem('musicToken');
        return localStorageData? JSON.parse(localStorageData) : defaultValue
    });

    const getToken=()=>{
        getAccessToken().then(token=>{
            setMusicToken(token);
            localStorage.setItem('musicToken',JSON.stringify(token));
        })
    }


    return[
        musicToken,
        getToken
    ]
}
