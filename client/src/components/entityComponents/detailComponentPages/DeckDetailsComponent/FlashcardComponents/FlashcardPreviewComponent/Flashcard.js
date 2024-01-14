import './Flashcard.css'

import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove,faAdd} from '@fortawesome/free-solid-svg-icons'

import { DeckContext } from '../../../../../../contexts/entityContexts/DeckContext'

import { removeFlashcardFromDeck,attachFlashcardToDeck } from '../../../../../../services/entityService/deckService/deckAditionalService'

export default function Flashcard({flashcard,isSearch}){

  const navigate = useNavigate();

    const {deck,removeFlahcardFromDeckState} = useContext(DeckContext);

    const removeFlashcardFromDeckHandler = ()=>{
        if(window.confirm(`Наистина ли искате да премахнете тази флашкарта от ${deck.name}`)){
              removeFlashcardFromDeck(deck.id,flashcard.id).then(()=>{
                removeFlahcardFromDeckState(flashcard.id)
              }).catch(err=>{
                console.log(err)
              })
        }
    }

    const attachFlashcardToDeckHandler = ()=>{
         attachFlashcardToDeck(deck.id,flashcard.id).then(()=>{
             navigate(`/deck/${deck.id}`)
         }).catch(err=>{
          navigate('/404')
         })
    }

    return(
         <article className="flashcard-preview-wrapper flashcard-wrap-final">
            {flashcard.isOwnedByUser && !isSearch?
             <p className='remove-flashcard'><FontAwesomeIcon  onClick={removeFlashcardFromDeckHandler} icon={faRemove}/> </p>
             :
             <></>
            }
            {isSearch?
            <p className='add-flashcard-to-deck-icon' onClick={attachFlashcardToDeckHandler}><FontAwesomeIcon icon={faAdd}/></p>
            :
            <></>
            }
            <section className='flashcard-content'>
                <h3>
                  <Link to={`/deck/${deck.id}/flashcard/${flashcard.id}`}>
                    {flashcard.definition}{' :'}</Link></h3>
                <h5>{flashcard.explanation}</h5>
            </section>
         </article>
    )
} 