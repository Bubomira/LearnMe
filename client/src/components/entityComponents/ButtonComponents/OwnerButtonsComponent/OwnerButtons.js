import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faRemove} from '@fortawesome/free-solid-svg-icons'
import './OwnerButtons.css'

import { Link } from "react-router-dom";

export default function OwnerButtons({entityType,entityId}){

    return(
        <secion className="owner-buttons">
        <button className="update">
            <Link to={`/update/${entityType}/${entityId}`}><FontAwesomeIcon icon={faEdit} /></Link>
         </button>
        <button className="delete">
        <Link to={`/delete/${entityType}/${entityId}`}><FontAwesomeIcon icon={faRemove} /></Link>
        </button>
        </secion>
    )
}