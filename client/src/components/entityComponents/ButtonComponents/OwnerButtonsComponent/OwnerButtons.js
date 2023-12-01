import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faRemove} from '@fortawesome/free-solid-svg-icons'
import '../Buttons.css'

import { Link } from "react-router-dom";

export default function OwnerButtons({entityType,entityId,deleteHandler}){

    return(
        <section className="buttons">
        <button >
            <Link to={`/update/${entityType}/${entityId}`}><FontAwesomeIcon icon={faEdit} /></Link>
         </button>
        <button  onClick={deleteHandler}>
        <p ><FontAwesomeIcon icon={faRemove} /></p>
        </button>
        </section>
    )
}