import './NotePreviewCard.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

export default function NotePreviewCard({note}){

    return(
        <article className="note-preview-wrapper">
            <main>
                <h2 className='note-preview-header'>
                    {note.title}
                 </h2>
                 <section className="note-preview-tags">
                    {note?.tags?
                      note.tags.map(tag=><p key={tag.id}>{tag.name},</p>):
                      <></>
                    }
                 </section>
                 <button className="note-preview-details">
                    <Link to={`/note/${note.id}`}>Details</Link>
                 </button>
            </main>
            <aside className='note-preview-aside'>
                <FontAwesomeIcon icon={faStickyNote}/>
            </aside>
        </article>
    )

}