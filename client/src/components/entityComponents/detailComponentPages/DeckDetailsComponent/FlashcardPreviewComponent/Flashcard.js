import './Flashcard.css'

import { Link } from 'react-router-dom'

export default function Flashcard({flashcard}){

    console.log(flashcard.definition)
    return(
         <article className="flashcard-preview-wrapper">
           <h3><Link to={`/flashcard/${flashcard.id}`}>{flashcard.definition}{' :'}</Link></h3>
           <h5>{flashcard.definition}</h5>
         </article>
    )
} 