import './SearchFlashcard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useParams,useNavigate } from "react-router-dom";

import useChangeInput from '../../../../../../hooks/useChangeInput';

import { useState } from "react";

import { searchFlashcards } from '../../../../../../services/entityService/flashcardServices';
import Flashcard from '../FlashcardPreviewComponent/Flashcard';
import useLoader from '../../../../../../hooks/useLoader';
import Loader from '../../../../../loader/Loader';

export default function SearchFlashcard(){
    const navigate = useNavigate();
    const {deckId} =useParams();

    let [loader,setLoader] = useLoader();

    let [isSearched,setIsSearched] = useState(false)

    const [flashcards,setFlashcards] = useState([]);

    const [values,setValues] = useChangeInput({
       flashcardName:''
    });
     const onSearchFlashcard = (e)=>{
         e.preventDefault();
         setIsSearched(true)
         setLoader(false)
        searchFlashcards(values.flashcardName).then(flashcards=>{
            setFlashcards(flashcards);
            setLoader(true)
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
               {!isSearched?
               <></>
               :!loader?
               <Loader/>
               :
              <section className='flashcards-holder'>
                {flashcards?.length ==0?
                <h2 className='no-flashcards-message'>No flashcards found...</h2>:
                 flashcards?.map(flashcard=>
                <Flashcard flashcard={flashcard} isSearch={true} key={flashcard.id}/>
                )
                }
              </section>
               }
        </section>
    )
   
}