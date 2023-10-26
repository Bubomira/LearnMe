import './DeckDetails.css'

import { useParams,Link } from "react-router-dom";

import { useState, useEffect,useContext} from "react";

import { AuthContext } from '../../../../contexts/AuthContext';
import { getDeck } from "../../../../services/deckServices";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import TagSection from '../TagDetailsComponent/TagSectionComponent/TagSection';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons'

export default function DeckDetails(){
    const {deckId} = useParams();

    const {user} = useContext(AuthContext);

    const [deck,setDeck] = useState({});

    useEffect(()=>{
        getDeck(deckId).then(deckDetailed=>{
            setDeck(deckDetailed)
        }).catch(err=>{
            alert(err)
        })
    },[deckId])

    return(
      <section className='deck-details-wrapper'>
         <header className="deck-details-header">
            <section className='header-divider'>
                  <h3>{deck.name}</h3>
                 {user.id==deck.ownerId?
                 <OwnerButtons  entityId={deck.id} entityType={'deck'}/>
                 :
                 <LikeButtons entityId={deck.id} entityType={'deck'}/>
                }
            </section>
                  {deck.tags?.length==0?
                   <></>
                   :
                    <TagSection isOwner={user.id==deck.ownerId} entityType={'deck'} tags={deck.tags}/>
                }
         </header>
         <main className="decl-details-main">
           <section className="flashcards">
                {/* todo */}
           </section>         
           <section className='deck-details-flashcards-buttons'>
                <button className="flashcards-button">Add Flashcard</button>
                <button className="flashcards-button">Seacrh Flashcards</button> 
           </section>
         </main>
      </section>
  
    )
}
        