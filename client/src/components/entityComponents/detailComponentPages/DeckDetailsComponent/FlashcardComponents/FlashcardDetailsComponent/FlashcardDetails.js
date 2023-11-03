import './FlashcardDetails.css'

import { useContext,useEffect,useState } from 'react'

import { useParams } from 'react-router-dom'

import { DeckContext } from '../../../../../../contexts/entityContexts/DeckContext'

import { getFlashcardDetails } from '../../../../../../services/entityService/flashcardServices'

export default function FlashcardDetails(){
    const {deckId,flashcardId} = useParams();
    const {deck} = useContext(DeckContext);

    const [flashcard,setFlashcard] = useState({})

    const [clicked,setClicked] = useState(false);

    const clickerHandler = ()=>{
        setClicked(!clicked);
    }

    useEffect(()=>{
        getFlashcardDetails(flashcardId).then(flashcard=>{
              setFlashcard(flashcard);
        })
    },[flashcardId])

   return(
    <article className='flashcard-details' onClick={clickerHandler}>
        <h2>{clicked? flashcard.definition : flashcard.explanation}</h2>
    </article>
    
   )
}