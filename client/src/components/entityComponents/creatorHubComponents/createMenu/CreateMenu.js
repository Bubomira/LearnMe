import './CreateMenu.css'

import flashcards from '../../../../static/img/flashcards.jpg'
import mindmaps from '../../../../static/img/mindmaps.jpg'
import notes from '../../../../static/img/notes.jpg'

import { Link } from "react-router-dom";

export default function CreateMenu(){
    return(
        <div className='create-menu-content'>
           <h2>Hello! What would you like to create?</h2>
           <article className='create-menu-info'>
           <section className="create-section">
               <h4>Notes</h4>
               <img src={notes} alt="" />
               <button className='createBtn'><Link to='/create/notes'>Get started...</Link></button>
           </section >
           <section className="create-section">
            <h4>Decks with flashcards</h4>
            <img src={flashcards} alt="" />
            <button className='createBtn'><Link to='/create/flashcards'>Get started...</Link></button>
           </section>
           <section className="create-section">
                 <h4>Mindmaps</h4>
                 <img src={mindmaps}/>
                 <button className='createBtn'><Link to='/create/mindmaps'>Get started...</Link></button>
           </section>
           </article>
        </div>
    )
}