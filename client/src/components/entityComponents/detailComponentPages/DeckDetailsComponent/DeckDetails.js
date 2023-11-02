import './DeckDetails.css'

import { useParams,Link } from "react-router-dom";

import { useEffect,useContext} from "react";

import { DeckContext } from '../../../../contexts/entityContexts/DeckContext';
import { getDeck } from "../../../../services/entityService/deckService/deckServices";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import TagSection from '../TagDetailsComponent/TagSectionComponent/TagSection';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons'
import Flashcard from './FlashcardPreviewComponent/Flashcard';

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

    console.log(deck)
    
    return(
      <section className='deck-details-wrapper'>
         <header className="deck-details-header">
            <section className='header-divider'>
                  <h3>{deck.name}</h3>
                 {deck.isOwnedByUser?
                 <OwnerButtons entityId={deck.id}  entityType={'deck'}/>
                 :
                 <LikeButtons entityId={deck.id} entityType={'deck'}/>
                }
            </section>               
            <TagSection info={deck}  entityType={'deck'} />
         </header>
         <main className="deck-details-main">
           <section className="flashcards">
                {deck.flashcards?.map(f=><Flashcard  flashcard={f} key={f.id}/>)}
           </section>         
           <section className='deck-details-flashcards-buttons'>
                <button className="flashcards-button "><Link to='/create/flashcard'>Add Flashcard</Link></button>
                <button className="flashcards-button"><Link to='/search/flashcard'>Seacrh Flashcards</Link></button> 
           </section>
         </main>
      </section>
  
    )
}
        