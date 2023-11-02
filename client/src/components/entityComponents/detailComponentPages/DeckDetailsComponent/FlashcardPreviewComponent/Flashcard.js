import './Flashcard.css'

import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove} from '@fortawesome/free-solid-svg-icons'

import { DeckContext } from '../../../../../contexts/entityContexts/DeckContext'

import { removeFlashcardFromDeck } from '../../../../../services/entityService/deckService/deckAditionalService'

export default function Flashcard({flashcard}){

    const {deck,removeFlahcardFromDeckState} = useContext(DeckContext)

    const removeFlashcardFromDeckHandler = ()=>{
        if(window.confirm('Are you sure you want to delete this flashcard?')){
              removeFlashcardFromDeck(deck.id,flashcard.id).then(()=>{
                removeFlahcardFromDeckState(flashcard.id)
              }).catch(err=>{
                console.log(err)
              })
        }
    }
    console.log(flashcard.definition)
    return(
         <article className="flashcard-preview-wrapper">
            <section className='flashcard-content'>
                <h3><Link to={`/flashcard/${flashcard.id}`}>{flashcard.definition}{' :'}</Link></h3>
                <h5>{flashcard.definition}</h5>
            </section>
            <p className='remove-flashcard'><FontAwesomeIcon  onClick={removeFlashcardFromDeckHandler} icon={faRemove}/> </p>
         </article>
    )
} 