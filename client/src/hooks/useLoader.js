import { useState } from "react";

export default function useLoader(){
    let [loader,setLoader] = useState(false);

    const changeLoader = (value)=>{
        setLoader(value)
    }


    return [
        loader,
        changeLoader
    ]
}