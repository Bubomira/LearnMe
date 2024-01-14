import { useState } from "react";
import { getAccessToken } from "../services/musicServices";

export default function useMusicAuth(defaultValue){

    let [musicToken,setMusicToken] = useState(()=>{
        const localStorageData = localStorage.getItem('musicToken');
        return localStorageData? JSON.parse(localStorageData) : defaultValue
    });

    const getToken=async()=>{
        let result = new Promise((resolve,reject)=>{
            getAccessToken().then(token=>{
                try {
                    setMusicToken(token);
                    localStorage.setItem('musicToken',JSON.stringify(token));
                    resolve()           
                } catch (error) {
                    reject()
                }
        })
        })
        return result
    }



    return[  
        getToken
    ]
}
