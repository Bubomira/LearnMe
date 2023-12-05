
import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import DeckCollection from "../DeckCollection/DeckCollection";

import { getOwnedDecks } from "../../../../../services/entityService/deckService/deckUserService";

export default function OwnedDeckCollection(){

    const navigate = useNavigate();

    let [ownedDecks,setOwnedDecks] = useState([]);

    useEffect(()=>{
        getOwnedDecks().then(decks=>{
            setOwnedDecks(decks)
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    return(
        <DeckCollection areOwned={true} decks={ownedDecks}/>
    )
}