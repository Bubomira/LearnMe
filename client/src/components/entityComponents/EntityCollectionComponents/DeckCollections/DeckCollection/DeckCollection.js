import '../../EntityCollection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import DeckPreviewCard from '../../../PreviewCardComponent/DeckPreviewCard/DeckPreviewCard'
import Loader from '../../../../loader/Loader'

export default function DeckCollection({decks,areOwned,neededMessage,isSearched,loader,firstTimeSearhed,areNormal}){

    return(
            <div className="collection-wrapper">
                <header className="collection-header">
                      <h1 className='message'>
                        {neededMessage?
                        'Резултати от търсенето:'
                        :
                         areOwned?
                        'Това са създадените от Вас декове!':
                        'Това са харесаните ви декове!'
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
                     (isSearched && neededMessage)||(areNormal)? 
                     <p className="no-entities-message">
                          Няма резултати
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