import { useState } from "react";

export default function useChangeInput(defaultValues){
    const [values, setValues] =useState(defaultValues)
    
     const ChangeInput=(e)=>{
        if(e.target.type=='file'){
            setValues((oldState)=>({
                ...oldState,
            'ImageUrl':URL.createObjectURL(e.target.files[0])
        }))
        }
        if(e.target.id=='image'|| e.target.id=='text'){
            setValues((oldState)=>({
                ...oldState,
                'ImageChecked':e.target.id!='text',
            }))
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