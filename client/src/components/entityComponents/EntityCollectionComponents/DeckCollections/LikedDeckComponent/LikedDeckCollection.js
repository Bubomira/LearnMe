
import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import DeckCollection from "../DeckCollection/DeckCollection";

import { getLikedDecks } from "../../../../../services/entityService/deckService/deckUserService";
import useLoader from "../../../../../hooks/useLoader";

export default function LikedDecksCollection(){
    
    const navigate = useNavigate();

    let [likedDecks,setLikedDecks] = useState([]);

    let [loader,setLoader] = useLoader()

    useEffect(()=>{
        getLikedDecks().then(decks=>{
            setLikedDecks(decks);
            setLoader(true);
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    return (
        <DeckCollection decks={likedDecks} areOwned={false} loader={loader} areNormal={true} firstTimeSearhed={true}/>
    )

}