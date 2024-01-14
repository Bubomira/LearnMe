import './CreateMenu.css'

import flashcards from '../../../../static/img/flashcards.jpg'
import mindmaps from '../../../../static/img/mindmaps.jpg'
import notes from '../../../../static/img/notes.jpg'

import { Link } from "react-router-dom";

export default function CreateMenu(){
    return(
        <div className='create-menu-content'>
           <h2>Здравейте! Какво ще искате да създадете?</h2>
           <article className='create-menu-info'>
           <section className="create-section">
               <h4>Бележки</h4>
               <img src={notes} alt="" />
               <button className='createBtn'><Link to='/create/notes'>Започни тук...</Link></button>
           </section >
           <section className="create-section">
            <h4>Дек с флашкарти</h4>
            <img src={flashcards} alt="" />
            <button className='createBtn'><Link to='/create/decks'>Започни тук...</Link></button>
           </section>
           <section className="create-section">
                 <h4>Мисловни карти</h4>
                 <img src={mindmaps}/>
                 <button className='createBtn'><Link to='/create/mindmaps'>Започни тук...</Link></button>
           </section>
           </article>
        </div>
    )
}