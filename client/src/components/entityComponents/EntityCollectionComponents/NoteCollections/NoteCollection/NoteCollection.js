import '../../EntityCollection.css'

import './NoteCollection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import NotePreviewCard from '../../../PreviewCardComponent/NotePreviewCard/NotePreviewCard'
import Loader from '../../../../loader/Loader'

export default function NoteCollection({notes,areOwned,neededMessage,isSearched,loader,firstTimeSearhed,areNormal}){

    return(
        <section className="note-collection-wrapper">
            <header className='collection-header'>
            <h1 className='message'>
                 {neededMessage?
                    'Резултати от търсенето:'
                    :areOwned?
                   'Това са създадените от Вас бележки!':
                   'Това са харесаните ви бележки!'
               }
            </h1>
            </header>        
            {firstTimeSearhed?
            !loader?
            <Loader/>
            :
            <main className="collection">
                {notes?.length>0?
                 notes.map(note=><NotePreviewCard note={note} key={note.id}></NotePreviewCard>)
                 :
                 (isSearched&&neededMessage)||(areNormal)?
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
        </section>
    )
}