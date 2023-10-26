import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp,faThumbsDown} from '@fortawesome/free-regular-svg-icons'
import '../Buttons.css'

import { Link } from "react-router-dom";

export default function OwnerButtons({entityType,entityId}){

    return(
        <secion className="buttons">
        <button >
            <Link to={`/like/${entityType}/${entityId}`}><FontAwesomeIcon icon={faThumbsUp} /></Link>
         </button>
        <button >
        <Link to={`/dislike/${entityType}/${entityId}`}><FontAwesomeIcon icon={faThumbsDown} /></Link>
        </button>
        </secion>
    )
}