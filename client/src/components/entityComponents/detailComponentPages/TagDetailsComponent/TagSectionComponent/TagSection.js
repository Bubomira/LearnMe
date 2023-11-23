import './TagSection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import Tag from '../TagComponent/Tag'


export default function TagSection({entityType,info,detachTag}){
    
    return(
        <section className="tags">
         {
         info.tags?.map(tag=><Tag tag={tag} isOwner={info.isOwnedByUser} key={tag.id} detachTag={detachTag}/>)
         }
        {info.isOwnedByUser?
        <p className='add-tag'><Link to={`/${entityType}/${info.id}/add/tag`}><FontAwesomeIcon icon={faAdd}/></Link></p>
        :
        <></>
        }
        </section>
    )
}