import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp,faThumbsDown} from '@fortawesome/free-regular-svg-icons'
import '../Buttons.css'


export default function OwnerButtons({likeHandler,dislikeHandler,isLiked}){

    console.log(isLiked)
    return(
        <section className="buttons">
        <button onClick={likeHandler} disabled={isLiked} id={isLiked?'disabled':''} >
           <FontAwesomeIcon icon={faThumbsUp} />
         </button>
        <button onClick={dislikeHandler} disabled={!isLiked} id={!isLiked?'disabled':''}>
          <FontAwesomeIcon icon={faThumbsDown} /> 
        </button>
        </section>
    )
}