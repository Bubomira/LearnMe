import './SearchFlashcard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useParams,useNavigate } from "react-router-dom";

import useChangeInput from '../../../../../../hooks/useChangeInput';

import { useState } from "react";
import Flashcard from '../FlashcardPreviewComponent/Flashcard';

import { searchFlashcards } from '../../../../../../services/entityService/flashcardServices';

export default function SearchFlashcard(){
    const navigate = useNavigate();
    const {deckId} =useParams();

    const [flashcards,setFlashcards] = useState([]);

    const [values,setValues] = useChangeInput({
       flashcardName:''
    });
     const onSearchFlashcard = (e)=>{
         e.preventDefault();
        searchFlashcards(values.flashcardName).then(flashcards=>{
            setFlashcards(flashcards);
        }).catch(err=>{
            navigate('/404')
        })
     }

    return(
        <section className="search-flashcard-wrapper">            
               <form className="search-flashcard-form" onSubmit={onSearchFlashcard}>
                <input
                 className="search-flashcard-input"
                 placeholder='Search flashcard...'
                 name='flashcardName'
                 onChange={setValues}
                 ></input>
                <button type="submit" className='search-flashcard-submit'>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
               </form>
              <section className='flashcards-holder'>
                {flashcards?.length ==0?
                <h2 className='no-flashcards-message'>No flashcards found...</h2>:
                flashcards?.map(flashcard=><Flashcard flashcard={flashcard}/>)
                }
              </section>
        </section>
    )
   
}