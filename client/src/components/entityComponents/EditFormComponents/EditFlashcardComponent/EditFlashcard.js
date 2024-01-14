import '../Edit.css'

import { useParams,useNavigate } from 'react-router-dom'

import { useState, useEffect,useContext} from 'react'    

import { DeckContext } from '../../../../contexts/entityContexts/DeckContext'

import useChangeInput from '../../../../hooks/useChangeInput'
import { getFlashcardDetails,updateFlashcard} from '../../../../services/entityService/flashcardServices';

export default function EditFlashcard(){
    const navigate =useNavigate();
    const {flashcardId} = useParams();

    const [values,setValues] = useChangeInput({
        definition:'',
        explanation:'',
        type:'Text'
    })

    const {deck} = useContext(DeckContext)

    const [flashcard,setFlashcard] = useState({})

    useEffect(()=>{
        getFlashcardDetails(flashcardId).then(flashcardToBeEdited=>{
            setFlashcard(flashcardToBeEdited);
        }).catch(err=>{
            navigate('/404')
        })
    },[flashcardId])

    const editFlashcardHandler= (e)=>{
        e.preventDefault();
        updateFlashcard(flashcard.id,values).then(()=>{
           navigate(`/deck/${deck.id}/flashcard/${flashcard.id}`)
        }).catch(err=>{
            navigate('/404')
        })

    }

    return (
    <form className='edit-form' onSubmit={editFlashcardHandler}>
        <h2 className='edit-heading'>Редактирай флашкарта</h2>
        <input 
        className='edit-input'
        type="text"
        name="definition"
        onChange={setValues}
        placeholder='Дефиниция'
        defaultValue={flashcard.definition}
        />
         <input 
        className='edit-input'
        type="text"
        name="explanation"
        onChange={setValues}
        placeholder='Обяснение'
        defaultValue={flashcard.explanation}
        />

        <input className='edit-button' type="submit" value="Редактирай" />
    </form>
    )
}