import { useState } from "react";

export default function useChangeInput(defaultValues){
    const [values, setValues] =useState(defaultValues)
    
     const ChangeInput=(e)=>{
        setValues((oldState)=>({
            ...oldState,
            [e.target.name] :e.target.value
        }))
        console.log(e.target.value)
    }
    return[
        values,
        ChangeInput
    ]
}