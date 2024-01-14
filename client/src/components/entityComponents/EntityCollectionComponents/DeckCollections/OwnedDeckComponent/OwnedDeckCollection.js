
import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import DeckCollection from "../DeckCollection/DeckCollection";

import { getOwnedDecks } from "../../../../../services/entityService/deckService/deckUserService";
import useLoader from "../../../../../hooks/useLoader";

export default function OwnedDeckCollection(){

    const navigate = useNavigate();

    let [loader,setLoader] = useLoader();

    let [ownedDecks,setOwnedDecks] = useState([]);

    useEffect(()=>{
        getOwnedDecks().then(decks=>{
            setOwnedDecks(decks)
            setLoader(true);
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    return(
        <DeckCollection areOwned={true} decks={ownedDecks} loader={loader} firstTimeSearhed={true} areNormal={true}/>
    )
}