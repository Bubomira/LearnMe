import { useState,useEffect} from "react";

import { useNavigate } from "react-router-dom";

import NoteCollection from "../NoteCollection/NoteCollection";

import { getLikedNotes } from "../../../../../services/entityService/noteService/noteUserService";

export default function LikedNotesColection(){
    const navigate = useNavigate();

    let [likedNotes,setLikedNotes] = useState();

    useEffect(()=>{
        getLikedNotes().then(notes=>{
            setLikedNotes(notes)
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    return (
        <NoteCollection notes={likedNotes} areOwned={false}/>
    )
}