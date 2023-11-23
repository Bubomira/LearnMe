import './Tag.css'

import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove} from '@fortawesome/free-solid-svg-icons'


export default function Tag({tag,isOwner,detachTag}){

    return(
     <article className="tag">
        <p className='tag-name'>{tag.name}</p>
        {isOwner?
           <p className='remove-tag'><FontAwesomeIcon onClick={()=>detachTag(tag.id)} icon={faRemove}/></p>
           :
           <></>
        }
     </article>
    )
}