import './DeckPreviewCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faRectangleList } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom"

export default function DeckPreviewCard({deck}){

    return(
         <article className="deck-preview-wrapper">
            <div className='deck-preview-info-holder'>
                 <FontAwesomeIcon fontSize={'1.3em'} icon={faRectangleList}/>
               <h3>{deck.name}</h3>
            </div>
                <p className='deck-preview-tags'>{deck?.tags?.map(tag=>tag.name).join(', ')}</p>
             <button><Link to={`/deck/${deck.id}`}>Детайли</Link></button>
         </article>
    )

}