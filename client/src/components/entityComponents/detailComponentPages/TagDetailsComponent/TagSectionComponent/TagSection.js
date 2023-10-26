import './TagSection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import Tag from '../TagComponent/Tag'

export default function TagSection({entityType,tags,isOwner}){
    return(
        <section className="tags">
         {
         tags?.map(tag=><Tag tagName={tag} isOwner={isOwner}/>)
         }
        {isOwner?
        <p className='add-tag'><Link to={`/${entityType}/add/tag`}><FontAwesomeIcon icon={faAdd}/></Link></p>
        :
        <></>
        }
        </section>
    )
}