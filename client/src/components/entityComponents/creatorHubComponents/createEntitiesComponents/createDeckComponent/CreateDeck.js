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
            <h2>Създай дек</h2>
            <form className="create-form" onSubmit={onSubmitHandler}>
              <input
              className='create-input'
                 type="text"
                 name="Name"
                 id="name"
                 placeholder="Име"
                 onChange={setValues}
                />
                <input
                className='create-tags create-input'
                 type="text"
                 name="Tags"
                 id="tags"
                 placeholder="Опиши дека си с няколко тага!"
                 onChange={setValues}
                />
                <button className='creates-btn' type="submit">Създай</button>
            </form>
        </section>
       </div>
      </section>
     )
}