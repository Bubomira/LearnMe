import { useState,useEffect} from "react";

import { useNavigate } from "react-router-dom";

import NoteCollection from "../NoteCollection/NoteCollection";

import { getLikedNotes } from "../../../../../services/entityService/noteService/noteUserService";
import useLoader from "../../../../../hooks/useLoader";

export default function LikedNotesColection(){
    const navigate = useNavigate();

    let [likedNotes,setLikedNotes] = useState();

    let [loader,setLoader] = useLoader();

    useEffect(()=>{
        getLikedNotes().then(notes=>{
            setLikedNotes(notes)
            setLoader(true)
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    return (
        <NoteCollection notes={likedNotes} areOwned={false} loader={loader}/>
    )
}