import './MindmapPreviewCard.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faChartArea } from '@fortawesome/free-solid-svg-icons'

export default function MindmapPreviewCard({mindmap}){

    return(
        <article className="mindmap-preview-card">
            <div className="mindmap-preview-header">
                <FontAwesomeIcon fontSize={'2.5em'} icon={faChartArea}/>
                <h3 className='mindmap-heading'>{mindmap.name}</h3>
            </div>
            <div className="mindmap-preview-tags">
                  {mindmap.tags.map(tag=><p key={tag.id}>{tag.name}</p>)}  
            </div> 
            <button className='mindmap-preview-details-btn'>
                <Link to={`/mindmap/${mindmap.id}`}>Details</Link>
            </button>
        </article>
        )
}