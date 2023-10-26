import './Tag.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove} from '@fortawesome/free-solid-svg-icons'

export default function Tag({tagName,isOwner}){
    return(
     <article className="tag">
        <p className='tag-name'>{tagName}</p>
        {isOwner?
           <p className='remove-tag'><FontAwesomeIcon icon={faRemove}/></p>
           :
           <></>
        }
     </article>
    )
}