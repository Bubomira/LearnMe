import './DeckCollection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import DeckPreviewCard from '../DeckPreviewCard/DeckPreviewCard'

export default function DeckCollection({decks,areOwned}){

    return(
        <div className="deck-collection-wrapper">
            <header className="deck-collection-header">
                  <h1 className='message'>
                    {areOwned?
                    'Here are your owned decks!':
                    'These are the decks you have liked!'
                    }
                  </h1>
            </header>
            <main className="deck-collection">
                {decks.length>0?
                 decks.map(deck=><DeckPreviewCard deck={deck} key={deck.id}></DeckPreviewCard>)
                 :
                 <p className="no-decks-message">
                    This collection is empty
                    <FontAwesomeIcon icon={faSadTear} />
                 </p>
                }
            </main>

        </div>
    )
       
}