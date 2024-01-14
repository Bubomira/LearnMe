import '../../EntityCollection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import DeckPreviewCard from '../../../PreviewCardComponent/DeckPreviewCard/DeckPreviewCard'
import Loader from '../../../../loader/Loader'

export default function DeckCollection({decks,areOwned,neededMessage,isSearched,loader,firstTimeSearhed}){

    return(
            <div className="collection-wrapper">
                <header className="collection-header">
                      <h1 className='message'>
                        {neededMessage?
                        'Your search results:'
                        :
                         areOwned?
                        'Here are your owned decks!':
                        'These are the decks you have liked!'
                        }
                      </h1>
                </header>
                {firstTimeSearhed?
                !loader?
                <Loader/>
                :
                <main className="collection">
                    {decks?.length>0?
                     decks.map(deck=><DeckPreviewCard deck={deck} key={deck.id}></DeckPreviewCard>)
                     :
                     (isSearched && neededMessage)||(!isSearched && !neededMessage)? 
                     <p className="no-entities-message">
                        This collection is empty
                        <FontAwesomeIcon icon={faSadTear} />
                     </p>
                     :
                     <></>
                    }
                </main>
                :
                <></>
                }
    
            </div>
    )
       
}