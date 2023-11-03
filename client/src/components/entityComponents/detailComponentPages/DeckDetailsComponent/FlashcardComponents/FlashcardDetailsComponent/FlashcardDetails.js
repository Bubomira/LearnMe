import './FlashcardDetails.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { useContext,useEffect,useState } from 'react'

import { useParams } from 'react-router-dom'

import { DeckContext } from '../../../../../../contexts/entityContexts/DeckContext'
import { AuthContext } from '../../../../../../contexts/AuthContext'

import { getFlashcardDetails } from '../../../../../../services/entityService/flashcardServices'

import OwnerButtons from '../../../../ButtonComponents/OwnerButtonsComponent/OwnerButtons'

export default function FlashcardDetails(){
    const {deckId,flashcardId} = useParams();

    const {deck} = useContext(DeckContext);
    const {user} = useContext(AuthContext);

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
    <section className='flashcard-details-wrapper'>
        <p><FontAwesomeIcon icon={faAngleLeft}/></p> 
        <article className='flashcard-details' onClick={clickerHandler}>
            <h2>{clicked? flashcard.definition : flashcard.explanation}</h2>
            {
                flashcard.ownerId==user.Id?
                <OwnerButtons entityType={'flashcard'} entityId={flashcardId}/>
                :
                <></>
            }
        </article>
        <p><FontAwesomeIcon icon={faAngleRight}/></p>
    </section>
   )
}