import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Create.css'
import flashcards from '../../../../../static/img/flashcards.jpg'

import { DeckContext } from '../../../../../contexts/entityContexts/DeckContext';
import useChangeInput from '../../../../../hooks/useChangeInput'
import { addFlashcard } from '../../../../../services/entityService/flashcardServices';

import checkIfFormDataIsInvalid from '../../../../../utils/emtyFormChecker';

export default function CreateFlashcard(){

    const navigate =useNavigate();

    const [values,setValues]= useChangeInput({
        Explanation:'',
        Definition:''
     });

     const {deck} = useContext(DeckContext);


    const onSubmitHandler =(e)=>{
        e.preventDefault();
        if(!checkIfFormDataIsInvalid(values)){
            alert('Моля, попълнете всички полета!')
        }else{
            values.DeckId = deck.id;
            values.Type= 'Text';
            addFlashcard(values).then(()=>{
                navigate(`/deck/${deck.id}`)
            }).catch(err=>{
                alert(err)
            })
        }
    }
    return(
        <section className="site-wrapper">
        <section className="create-wrapper">
        <img width={'50%'}  src={flashcards} alt="decks" />
        <section className="create-form-holder">
            <h2>Създай <br/> флашкарта</h2>
            <form className="create-form" onSubmit={onSubmitHandler} >
                <input
                className='create-input'
                 type="text"
                 name="Definition"
                 id="Definition"
                 placeholder="Дефиниция"
                 onChange={setValues}
                />
              <input
                 type="text"
                 name="Explanation"
                 id="Explanation"
                 placeholder="Обяснение"
                 onChange={setValues}
                 className='create-input'
                />
                <button className='creates-btn' type="submit">Създай</button>
            </form>
        </section>
        </section>
        </section>
    )
}