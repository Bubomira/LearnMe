import '../../EntityCollection.css'

import './NoteCollection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import NotePreviewCard from '../../../PreviewCardComponent/NotePreviewCard/NotePreviewCard'

export default function NoteCollection({notes,areOwned,neededMessage,isSearched}){

    return(
        <section className="note-collection-wrapper">
            <header className='collection-header'>
            <h1 className='message'>
                 {neededMessage?
                    'Your search results:'
                    :areOwned?
                   'Here are all of your notes:':
                   'These are the notes you have liked:'
               }
            </h1>
            </header>            
            <section className="collection note-collection">
                {notes?.length>0 ?
                   notes.map(note=><NotePreviewCard key={note?.id} note={note}/>):
                   (isSearched && neededMessage)||(!isSearched && !neededMessage)? 
                 <p className="no-entities-message">
                    This collection is empty
                    <FontAwesomeIcon icon={faSadTear} />
                 </p>
                 :
                 <></>
                }
            </section>
        </section>
    )
}