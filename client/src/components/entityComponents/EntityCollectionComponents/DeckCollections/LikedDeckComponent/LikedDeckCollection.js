
import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import DeckCollection from "../DeckCollection/DeckCollection";

import { getLikedDecks } from "../../../../../services/entityService/deckService/deckUserService";

export default function LikedDecksCollection(){
    
    const navigate = useNavigate();

    let [likedDecks,setLikedDecks] = useState([]);

    useEffect(()=>{
        getLikedDecks().then(decks=>{
            setLikedDecks(decks);
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    return (
        <DeckCollection decks={likedDecks} areOwned={false}/>
    )

}