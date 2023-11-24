import CreateTag from "../CreateTag";

import { useContext,useEffect } from "react";

import { useNavigate,useParams } from "react-router-dom";

import { NoteContext } from "../../../../../../contexts/entityContexts/NoteContext";
import { getNoteDetails } from "../../../../../../services/entityService/noteService/noteService";
import { attachTagToNote } from "../../../../../../services/entityService/noteService/noteAdditionalService";

export default function AttachTagToNote (){

    const navigate =useNavigate();

    const {noteId} = useParams();

    let {note,setNoteDetailed} = useContext(NoteContext);

    useEffect(()=>{
        getNoteDetails(noteId).then(note=>{
            setNoteDetailed(note);
        }).catch(err=>{
            navigate('/404')
        })
    },)

    const attachTagToNoteHandler = (e,tagName)=>{
         e.preventDefault();
         attachTagToNote(note.id,tagName).then(()=>{
             navigate(`/note/${note.id}`)
         }).catch(err=>{
            navigate('/404')
         })

    }

    return (
        <CreateTag attachTagHandler={attachTagToNoteHandler}/>
    )

}