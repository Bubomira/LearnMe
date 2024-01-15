import CreateTag from "../CreateTag";

import { useNavigate,useParams } from "react-router-dom";

import { useEffect,useContext } from "react";

import { DeckContext } from "../../../../../../contexts/entityContexts/DeckContext";

import { attachTagToDeck } from "../../../../../../services/entityService/deckService/deckAditionalService";

import { getDeck } from "../../../../../../services/entityService/deckService/deckServices";

export default function AttachTagToDeck(){

    const navigate = useNavigate();

    const {deckId} = useParams();

    const {deck,setDeckDetailed} = useContext(DeckContext)

    useEffect(()=>{
        getDeck(deckId).then(deck=>{
            setDeckDetailed(deck)
        }).catch(err=>{
            navigate('/404')
        })

    },[deckId])

    const onAttachTagHandler = (e,tagName)=>{
        e.preventDefault();
        if(!tagName){
            alert('Моля, попълнете всички полета!')
         }else{
        attachTagToDeck(deck.id,tagName).then(()=>{
            navigate(`/deck/${deckId}`)
        }).catch(()=>{
            navigate('/404')
        })     
    }
    } 

    return <CreateTag attachTagHandler={onAttachTagHandler} />
}