import { createContext, useState } from "react";

export const DeckContext = createContext();

export const DeckProvider = ({children})=>{
    let [deckDetails,setDeck] =useState({});

    const setDeckDetailed = (newDeck)=>{
        setDeck(newDeck);
    }

    return (
    <DeckContext.Provider  value={{deck:deckDetails, setDeckDetailed}}>
         {children}
    </DeckContext.Provider>
    )
}