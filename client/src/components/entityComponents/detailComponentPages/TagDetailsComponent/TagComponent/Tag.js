import './Tag.css'

import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove} from '@fortawesome/free-solid-svg-icons'

import { DeckContext } from '../../../../../contexts/entityContexts/DeckContext'

import { detachTagFromDeck } from '../../../../../services/entityService/deckService/deckAditionalService'

export default function Tag({tag,isOwner}){

   const {deck,detachTagFromDeckState} = useContext(DeckContext);

   const detachTagFromDeckHandler = ()=>{
      detachTagFromDeck(deck.id,tag.id).then(()=>{
         detachTagFromDeckState(tag.id);
      }).catch(err=>{
         alert(err);
      })
   }
    return(
     <article className="tag">
        <p className='tag-name'>{tag.name}</p>
        {isOwner?
           <p className='remove-tag'><FontAwesomeIcon onClick={detachTagFromDeckHandler} icon={faRemove}/></p>
           :
           <></>
        }
     </article>
    )
}