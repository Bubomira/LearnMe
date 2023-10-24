import './CreateDeck.css'

import flashcards from '../../../../../static/img/flashcards.jpg'

import { useNavigate } from "react-router-dom";

export default function CreateDeck(){
     const navigate = useNavigate();

     return(
       <div className="create-deck-wrapper">
        <img width='50%' src={flashcards} alt="decks" />
        <section className="create-deck-form-holder">
            <h2>Create Deck</h2>
            <form className="create-deck-form">
              <input
                 type="text"
                 name="Name"
                 id="name"
                 placeholder="Name of deck"
                />
                <input
                 type="text"
                 name="Tags"
                 id="tags"
                 placeholder="Few tags that describe your deck!"
                />
                <button className='create-deck-btn' type="submit">Submit</button>
            </form>
        </section>
       </div>
     )
}