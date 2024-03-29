import './DeckDetails.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd,faSearch } from '@fortawesome/free-solid-svg-icons';

import { useParams,Link,useNavigate } from "react-router-dom";

import { useEffect,useContext} from "react";

import { DeckContext } from '../../../../contexts/entityContexts/DeckContext';
import { getDeck,deleteDeck } from "../../../../services/entityService/deckService/deckServices";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import TagSection from '../TagDetailsComponent/TagSectionComponent/TagSection';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons'
import Flashcard from './FlashcardComponents/FlashcardPreviewComponent/Flashcard';
import { dislikeDeck, likeDeck } from '../../../../services/entityService/deckService/deckUserService';
import { detachTagFromDeck } from '../../../../services/entityService/deckService/deckAditionalService';
import useLoader from '../../../../hooks/useLoader';
import Loader from '../../../loader/Loader';

export default function DeckDetails(){
    const navigate = useNavigate();
    const {deckId} = useParams();

    let [loader,setLoader]=useLoader();
    
    const {deck,setDeckDetailed,detachTagFromDeckState,changeIsLikedByUser} = useContext(DeckContext);

    useEffect(()=>{
        getDeck(deckId).then(deckDetailed=>{
            setDeckDetailed(deckDetailed)
            setLoader(true)
        }).catch(err=>{
            navigate('/404')
        })
    },[deckId])

    const deleteDeckHandler = ()=>{
        if(window.confirm('Наистина ли искате да изтриете този дек?')){
            deleteDeck(deck.id).then(()=>{
                 navigate('/welcome')
            }).catch(err=>{
                navigate('/404')
            })
        }
    }

    const likeDeckHandler = ()=>{
        likeDeck(deck.id).then(()=>{
            changeIsLikedByUser(true)
            alert('Успешно харесахте!!')
        }).catch(err=>{
            navigate('/404')
        })
    }

    const dislikeDeckHandler = ()=>{
        dislikeDeck(deck.id).then(()=>{
            changeIsLikedByUser(false)
            alert('Успешно отхаресахте!!')
        }).catch(err=>{
           navigate('/404')
        })
    }
    const detachTagFromDeckHandler = (tagId)=>{
        detachTagFromDeck(deck.id,tagId).then(()=>{
           detachTagFromDeckState(tagId);
        }).catch(err=>{
           alert(err);
        })
     }
    return(
    <section>
        {!loader?
        <Loader/>
        :
        <>
         <section className='deck-details-header'>
            <section className='deck-name-info'>
              <h2>{deck.name}</h2>
               {deck.isOwnedByUser?
               <OwnerButtons entityId={deck.id}  entityType={'deck'} deleteHandler={deleteDeckHandler}/>
               :
               <LikeButtons
                likeHandler={likeDeckHandler}
                dislikeHandler={dislikeDeckHandler}
                isLiked={deck.isLikedByUser}
                />
               }
            </section>
            <TagSection info={deck}  entityType={'deck'} detachTag={detachTagFromDeckHandler} />  
        </section>
        <section className="flashcards">
            {deck.flashcards?.map(x=><Flashcard flashcard={x} key={x.id}/>)}
        </section>
        {deck.isOwnedByUser?
        <section className='flashcard-buttons'>
                <button className="flashcards-button ">
                      <Link to='/create/flashcard'>
                           <FontAwesomeIcon icon={faAdd}/>
                        </Link>
                </button>
                <button className="flashcards-button">
                    <Link to={`/deck/${deckId}/search/flashcard`}>
                    <FontAwesomeIcon icon={faSearch}/>
                    </Link>
                </button> 
        </section>
        :
        <></>
        }
        </>
        }
    </section>              

    )
}
        