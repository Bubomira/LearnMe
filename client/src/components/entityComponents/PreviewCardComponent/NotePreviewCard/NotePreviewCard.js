import './NotePreviewCard.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'


export default function NotePreviewCard({note}){

    return(
        <article className="note-preview-wrapper">
            <main className='note-preview-main'>
                <h2 className='note-preview-header'>
                    {note.title}
                 </h2>
                    {note?.tags?
                      <p className='tags'>{note?.tags?.map(tag=>tag.name).join(', ')}</p>
                      :
                      <></>
                    }
                 <button className="note-preview-details">
                    <Link to={`/note/${note.id}`}>Details</Link>
                 </button>
            </main>
            <aside className='note-preview-aside'>
                <FontAwesomeIcon color='white' fontSize={'2em'} icon={faNoteSticky}/>
            </aside>
        </article>
    )

}