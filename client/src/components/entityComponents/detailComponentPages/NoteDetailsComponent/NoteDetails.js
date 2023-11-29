import './NoteDetails.css'

import { useParams,useNavigate } from 'react-router-dom'

import { useEffect,useContext } from 'react';

import { NoteContext } from '../../../../contexts/entityContexts/NoteContext';

import { getNoteDetails } from '../../../../services/entityService/noteService/noteService';
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons';
import TagSection from '../TagDetailsComponent/TagSectionComponent/TagSection';

import { deleteNote } from '../../../../services/entityService/noteService/noteService';
import { likeNote,dislikeNote } from '../../../../services/entityService/noteService/noteUserService';
import { detachTagFromNote } from '../../../../services/entityService/noteService/noteAdditionalService';

export default function NoteDetails(){
    const navigate = useNavigate();
    const {noteId} = useParams();

    const {note,setNoteDetailed,detachTagFromNoteState} = useContext(NoteContext);


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

    const likeNoteHandler = ()=>{
        likeNote(note.id).then(()=>{
            navigate('/welcome')
        }).catch(err=>{
            navigate('/404')
        })
    }

    const dislikeNoteHandler=()=>{
        dislikeNote(note.id).then(()=>{
            navigate('/welcome')
        }).catch(err=>{
            navigate('/404')
        })
    }

    const detachTagFromNoteHandler = (tagId)=>{
         detachTagFromNote(note.id,tagId).then(()=>{
            detachTagFromNoteState(tagId);
         }).catch(err=>{
            navigate('/404')
         })      

    }
 
    return(
        <section className="note-details">
         <header className="note-header-info">
            <section className="note-name-info">
               <h2>{note?.title}</h2>
               {note.isOwnedByUser?
                 <OwnerButtons entityId={note.id} entityType={'note'} deleteHandler={onDeleteHandler} />
                 :
                 <LikeButtons likeHandler={likeNoteHandler} dislikeHandler={dislikeNoteHandler} isLiked={note.isLikedByUser}/>
               }             
            </section>
             <TagSection detachTag={detachTagFromNoteHandler} info={note} entityType={'note'}/>
        </header>
            <main className="note-content">
                <p className='note-content-text'>{note?.content}</p>
            </main>
        </section>
    )
}