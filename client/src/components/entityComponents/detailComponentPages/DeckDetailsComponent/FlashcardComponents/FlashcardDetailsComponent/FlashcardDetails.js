import './FlashcardDetails.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { useContext,useEffect,useState } from 'react'

import { useParams,useNavigate } from 'react-router-dom'

import { DeckContext } from '../../../../../../contexts/entityContexts/DeckContext'
import { AuthContext } from '../../../../../../contexts/AuthContext'

import { deleteFlashcard, getFlashcardDetails } from '../../../../../../services/entityService/flashcardServices'

import OwnerButtons from '../../../../ButtonComponents/OwnerButtonsComponent/OwnerButtons'
import { getDeck } from '../../../../../../services/entityService/deckService/deckServices'
import useLoader from '../../../../../../hooks/useLoader'
import Loader from '../../../../../loader/Loader'

export default function FlashcardDetails(){
    const navigate = useNavigate();
    let {deckId,flashcardId} = useParams();

    let [loader,setLoader] = useLoader();

    const {deck,setDeckDetailed} = useContext(DeckContext);
    const {user} = useContext(AuthContext);

    const [flashcard,setFlashcard] = useState({})

    const [clicked,setClicked] = useState(false);

    const clickerHandler = ()=>{
        setClicked(!clicked);
    }

    useEffect(()=>{
        getFlashcardDetails(flashcardId).then(flashcard=>{
              setFlashcard(flashcard);
              setLoader(true)
        }).catch(err=>{
            navigate('/404')
        })
    },[flashcardId])

    useEffect(()=>{
        getDeck(deckId).then(newDeck=>{ 
            setDeckDetailed(newDeck)
        }).catch(err=>{
            navigate('/404')
        })
    },[deckId])
    
    useEffect(()=>{
        if(!deck.flashcards?.some(f=>f.id==flashcardId)){
            navigate('/404')
        }
    },[deckId,flashcardId])

   const goBack = ()=>{
     let indexOfCurrentFlashcard = deck.flashcards?.findIndex(f=>f.id==flashcardId);
     const previousFlashcard = deck.flashcards[indexOfCurrentFlashcard-=1];
     navigate(`/deck/${deck.id}/flashcard/${previousFlashcard.id}`)
   }

   const goForward = ()=>{
    let indexOfCurrentFlashcard = deck.flashcards?.findIndex(f=>f.id==flashcardId);
    const nextFlashcard = deck.flashcards[indexOfCurrentFlashcard+=1];    
    navigate(`/deck/${deck.id}/flashcard/${nextFlashcard.id}`)

  }

  const deleteFlashcardHandler = ()=>{
      if(window.confirm('Do you want to delete this flashcard?')){
        deleteFlashcard(flashcard.id).then(()=>{
            navigate(`/deck/${deck.id}`)
        }).catch(err=>{
            alert(err)
        })
      }
  }

   return(
    <section className="flashcard-details-section">
        {!loader?
        <Loader/>
        :
    <section className='flashcard-details-wrapper'>
        {deck.flashcards?.findIndex(f=>f.id==flashcardId)>0?
        <p onClick={goBack}><FontAwesomeIcon icon={faAngleLeft}/></p> 
        :
        <></>
        }
        <article className='flashcard-details' onClick={clickerHandler}>
            <h2>{clicked? flashcard.definition : flashcard.explanation}</h2>
            {
                flashcard.isOwnedByUser?
                    <OwnerButtons entityType={'flashcard'} entityId={flashcardId} deleteHandler={deleteFlashcardHandler}/>
                :
                <></>
            }
        </article>
        {deck.flashcards?.findIndex(f=>f.id==flashcardId)<deck.flashcards?.length-1?
         <p onClick={goForward}><FontAwesomeIcon icon={faAngleRight}/></p>
        :
        <></>
        }
       
    </section>
}
 </section>   
   )
}