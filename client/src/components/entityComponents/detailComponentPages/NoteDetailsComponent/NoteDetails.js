import './NoteDetails.css'

import { useParams,useNavigate } from 'react-router-dom'

import { useEffect,useContext } from 'react';

import { NoteContext } from '../../../../contexts/entityContexts/NoteContext';

import { getNoteDetails } from '../../../../services/entityService/noteService/noteService';
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons';
import TagSection from '../TagDetailsComponent/TagSectionComponent/TagSection';

import { deleteNote } from '../../../../services/entityService/noteService/noteService';

export default function NoteDetails(){
    const navigate = useNavigate();
    const {noteId} = useParams();

    const {note,setNoteDetailed} = useContext(NoteContext);


    useEffect(()=>{
        getNoteDetails(noteId).then(noteDetailed=>{
            setNoteDetailed(noteDetailed);
        }).catch(err=>{
              navigate('/404')
        })
    },[noteId])

    const onDeleteHandler = ()=>{
        if(window.confirm(`Are you sure you want to delete note with id ${note.id}`)){
            deleteNote(note.id).then(()=>{
                navigate('/welcome')
            }).catch(err=>{
                navigate('/404')
            })
        }
    }
 
    return(
        <section className="note-details">
            <header className="note-header-info">
               <h2>{note?.title}</h2>
               {note.isOwnedByUser?
                 <OwnerButtons entityId={note.id} entityType={'note'} deleteHandler={onDeleteHandler} />
                 :
                 <LikeButtons/>
               }             
            </header>
          <TagSection info={note} entityType={'note'}/>
            <main className="note-content">
                <p className='note-content-text'>{note?.content}</p>
            </main>
        </section>
    )
}