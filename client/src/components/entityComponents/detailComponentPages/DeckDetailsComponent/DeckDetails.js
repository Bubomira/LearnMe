import './DeckDetails.css'

import { useParams,Link } from "react-router-dom";

import { useState, useEffect,useContext} from "react";

import { DeckContext } from '../../../../contexts/entityContexts/DeckContext';
import { getDeck } from "../../../../services/deckServices";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import TagSection from '../TagDetailsComponent/TagSectionComponent/TagSection';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons'

export default function DeckDetails(){
    const {deckId} = useParams();
    
    const {deck,setDeckDetailed} = useContext(DeckContext);

    useEffect(()=>{
        getDeck(deckId).then(deckDetailed=>{
            setDeckDetailed(deckDetailed)
        }).catch(err=>{
            alert(err)
        })
    },[deckId])

    return(
      <section className='deck-details-wrapper'>
         <header className="deck-details-header">
            <section className='header-divider'>
                  <h3>{deck.name}</h3>
                 {deck.isOwnedByUser?
                 <OwnerButtons   entityType={'deck'}/>
                 :
                 <LikeButtons  entityType={'deck'}/>
                }
            </section>
                  {deck.tags?.length==0?
                   <></>
                   :
                    <TagSection info={deck}  entityType={'deck'} />
                }
         </header>
         <main className="decl-details-main">
           <section className="flashcards">
                {/* todo */}
           </section>         
           <section className='deck-details-flashcards-buttons'>
                <button className="flashcards-button"><Link to='/add/flashcard'>Add Flashcard</Link></button>
                <button className="flashcards-button"><Link to='/search/flashcard'>Seacrh Flashcards</Link></button> 
           </section>
         </main>
      </section>
  
    )
}
        