import './DeckDetails.css'

import { useParams,Link } from "react-router-dom";

import { useState, useEffect,useContext} from "react";

import { AuthContext } from '../../../../contexts/AuthContext';
import { getDeck } from "../../../../services/deckServices";

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
        <article className="deck-details-wrapper">
            <div className='deck-details-head'>
               <h2 className="deck-details-name">{deck.name}</h2>
               <section className='deck-details-tags'>
                    {deck.tags?.map(tag=><div className='tag'>{tag}</div>)}
                        {user.id==deck.ownerId?
                         <div className='tag'><Link to='/'>Add tag...</Link></div>
                        :
                         <></>
                        }
               </section>
            </div>

            {deck.flashcards?.length==0?
            <section className='no-flashcard-message'>
                <h4>There aren't any flashcards in this deck...</h4>           
                <button className='add-flashcard'>
                    <Link to='/create/flashcard'>Create Flashcard</Link>
                </button>
            </section>:
            <section className='deck-details-flashcards-container'>
                 {/* to do: add flashcards and flashcard*/}
            </section>
}              
{/* ownership buttons */}
            
        </article>
    )
}