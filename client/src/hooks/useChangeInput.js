import { useState } from "react";

export default function useChangeInput(defaultValues){
    const [values, setValues] =useState(defaultValues)
    
     const ChangeInput=(e)=>{
        if(e.target.id=='image'|| e.target.id=='text'){
            setValues(()=>({
                'ImageChecked' : e.target.id=='text'
            }))
            console.log(values)
        }else{
            setValues((oldState)=>({
                ...oldState,
                [e.target.name] :e.target.value
            }))
        }
    }
    return[
        values,
        ChangeInput
    ]
}