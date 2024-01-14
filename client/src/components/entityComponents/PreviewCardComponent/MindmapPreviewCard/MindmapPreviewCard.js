import './MindmapPreviewCard.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faChartArea } from '@fortawesome/free-solid-svg-icons'

export default function MindmapPreviewCard({mindmap}){

    return(
        <article className="mindmap-preview-card">
            <aside className="mindmap-preview-aside">
                <FontAwesomeIcon fontSize={'1.5em'} color='white' icon={faChartArea}/>
            </aside>
            <main className="mindmap-preview-main">
            <div className="mindmap-preview-header">
                <h3 className='mindmap-heading'>{mindmap.name}</h3>
            </div>
            <p className="mindmap-preview-tags">{mindmap?.tags.map(tag=>tag.name).join(', ')}</p>
            <button className='mindmap-preview-details-btn'>
                <Link to={`/mindmap/${mindmap.id}`}>Details</Link>
            </button>
            </main>
        </article>
        )
}