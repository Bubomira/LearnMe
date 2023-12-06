import '../../EntityCollection.css'

import './NoteCollection.css'

import NotePreviewCard from '../NotePreviewCard/NotePreviewCard'

export default function NoteCollection({notes,areOwned}){

    return(
        <section className="note-collection-wrapper">
            <header className='collection-header'>
            <h1 className='message'>
               {areOwned?
                   'Here are all of your notes:':
                   'These are the notes you have liked:'
               }
            </h1>
            </header>            
            <section className="collection note-collection">
                {notes?.length>0 ?
                   notes.map(note=><NotePreviewCard key={note?.id} note={note}/>):
                   <p className='no-entities-message'></p>
                }
            </section>
        </section>
    )
}