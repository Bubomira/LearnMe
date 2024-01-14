import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import NoteCollection from "../NoteCollection/NoteCollection";

import { getOwnedNotes } from "../../../../../services/entityService/noteService/noteUserService";
import useLoader from "../../../../../hooks/useLoader";

export default function OwnedNotesCollection(){

    const navigate = useNavigate();

    let [ownedNotes,setOwnedNotes] = useState([]);

    let [loader,setLoader] = useLoader();

    useEffect(()=>{
          getOwnedNotes().then(notes=>{
            setOwnedNotes(notes);
            setLoader(true)
          }).catch(err=>{
            navigate('/404')
          })
    },[])

    return (
        <NoteCollection areOwned={true} notes={ownedNotes} loader={loader} firstTimeSearhed={true} areNormal={true}/>
    )
    
}
