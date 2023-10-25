import './CreateDeck.css'

import flashcards from '../../../../../static/img/flashcards.jpg'

import { useNavigate } from "react-router-dom";

import useChangeInput from '../../../../../hooks/useChangeInput';
import { createDeck } from '../../../../../services/deckServices';

export default function CreateDeck(){
     const navigate = useNavigate();

     const [values,setValues]= useChangeInput({
        Name:'',
        Tags:''
     });

     const onSubmitHandler =(e)=>{
        e.preventDefault()
       values.Tags= values.Tags===String? values.Tags.split(/\s+/):values.Tags
        createDeck(values).then(deck=>{
              navigate(`/deck/details/${deck.id}`)
        }).catch(err=>{
            alert(err);
        })
        
     }

     return(
       <div className="create-deck-wrapper">
        <img width='50%' src={flashcards} alt="decks" />
        <section className="create-deck-form-holder">
            <h2>Create Deck</h2>
            <form className="create-deck-form" onSubmit={onSubmitHandler}>
              <input
                 type="text"
                 name="Name"
                 id="name"
                 placeholder="Name of deck"
                 onChange={setValues}
                />
                <input
                 type="text"
                 name="Tags"
                 id="tags"
                 placeholder="Few tags that describe your deck!"
                 onChange={setValues}
                />
                <button className='create-deck-btn' type="submit">Submit</button>
            </form>
        </section>
       </div>
     )
}