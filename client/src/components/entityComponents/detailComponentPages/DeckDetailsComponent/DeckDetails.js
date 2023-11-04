import './DeckDetails.css'

import { useParams,Link,useNavigate } from "react-router-dom";

import { useEffect,useContext} from "react";

import { DeckContext } from '../../../../contexts/entityContexts/DeckContext';
import { getDeck,deleteDeck } from "../../../../services/entityService/deckService/deckServices";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import TagSection from '../TagDetailsComponent/TagSectionComponent/TagSection';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons'
import Flashcard from './FlashcardComponents/FlashcardPreviewComponent/Flashcard';

export default function DeckDetails(){
    const navigate = useNavigate();
    const {deckId} = useParams();
    
    const {deck,setDeckDetailed} = useContext(DeckContext);

    useEffect(()=>{
        getDeck(deckId).then(deckDetailed=>{
            setDeckDetailed(deckDetailed)
        }).catch(err=>{
            alert(err)
        })
    },[deckId])

    const deleteDeckHandler = ()=>{
        if(window.confirm('Do you want to delete this deck?')){
            deleteDeck(deck.id).then(()=>{
                 navigate('/welcome')
            }).catch(err=>{
              alert(err);
            })
        }
    }
    
    return(
      <section className='deck-details-wrapper'>
         <header className="deck-details-header">
            <section className='header-divider'>
                  <h3>{deck.name}</h3>
                 {deck.isOwnedByUser?
                 <OwnerButtons entityId={deck.id}  entityType={'deck'} deleteHandler={deleteDeckHandler}/>
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
        