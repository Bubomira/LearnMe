import '../Create.css'

import flashcards from '../../../../../static/img/flashcards.jpg'

import { useNavigate } from "react-router-dom";

import useChangeInput from '../../../../../hooks/useChangeInput';
import { createDeck } from '../../../../../services/entityService/deckService/deckServices';

export default function CreateDeck(){
     const navigate = useNavigate();

     const [values,setValues]= useChangeInput({
        Name:'',
        Tags:''
     });

     const onSubmitHandler =(e)=>{
        e.preventDefault()
       const tags= values.Tags.split(/\s+/)
        createDeck({Tags:tags,Name:values.Name}).then(deck=>{
              navigate(`/deck/${deck.id}`)
        }).catch(err=>{
            alert(err);
        })
        
     }

     return(
      <section className="site-wrapper">
       <div className="create-wrapper">
        <img width={'50%'} src={flashcards} alt="decks" />
        <section className="create-form-holder">
            <h2>Create Deck</h2>
            <form className="create-form" onSubmit={onSubmitHandler}>
              <input
              className='create-input'
                 type="text"
                 name="Name"
                 id="name"
                 placeholder="Name of deck"
                 onChange={setValues}
                />
                <input
                className='create-tags create-input'
                 type="text"
                 name="Tags"
                 id="tags"
                 placeholder="Few tags that describe your deck!"
                 onChange={setValues}
                />
                <button className='creates-btn' type="submit">Submit</button>
            </form>
        </section>
       </div>
      </section>
     )
}