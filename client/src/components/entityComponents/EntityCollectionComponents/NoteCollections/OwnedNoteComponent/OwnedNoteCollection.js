import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import NoteCollection from "../NoteCollection/NoteCollection";

import { getOwnedNotes } from "../../../../../services/entityService/noteService/noteUserService";

export default function OwnedNotesCollection(){

    const navigate = useNavigate();

    let [ownedNotes,setOwnedNotes] = useState([]);

    useEffect(()=>{
          getOwnedNotes().then(notes=>{
            setOwnedNotes(notes);
          }).catch(err=>{
            navigate('/404')
          })
    },[])

    return (
        <NoteCollection areOwned={true} notes={ownedNotes}/>
    )
    
}
