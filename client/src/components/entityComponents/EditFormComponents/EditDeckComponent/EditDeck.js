import '../Edit.css'

import { useContext,useEffect } from 'react'

import { useParams,useNavigate } from 'react-router-dom'

import { DeckContext } from '../../../../contexts/entityContexts/DeckContext'

import useChangeInput from '../../../../hooks/useChangeInput'

import { getDeck,updateDeck } from '../../../../services/entityService/deckService/deckServices'

export default function EditDeck(){
    const navigate = useNavigate();
    const {deckId} = useParams();

    const {deck,setDeckDetailed} = useContext(DeckContext);

    const [values,setValues] = useChangeInput({
        name:deck.name
    })

    useEffect(()=>{
       getDeck(deckId).then(deckToBeUpdated=>{
        setDeckDetailed(deckToBeUpdated)
       }).catch(err=>{
        navigate('/404')
       })
    },[deckId])

    const editDeckHandler = (e)=>{
        e.preventDefault();
        updateDeck(deckId,values.name).then(()=>{
            navigate(`/deck/${deck.id}`)
        }).catch(err=>{
            navigate('/404')
        })
    }
    return(
        <form className='edit-form' onSubmit={editDeckHandler}>
            <h2 className='edit-heading'>Edit deck</h2>
            <input className='edit-input'
            type='text'
            name='name'
            placeholder='newDeckName'
            defaultValue={deck.name}
            onChange={setValues}
              />
              <input className='edit-button' type="submit" value="Edit" />
        </form>
    )
}