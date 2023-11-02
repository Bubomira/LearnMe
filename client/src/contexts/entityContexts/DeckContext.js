import { createContext, useState } from "react";

export const DeckContext = createContext();

export const DeckProvider = ({children})=>{
    let [deckDetails,setDeck] =useState({});

    const setDeckDetailed = (newDeck)=>{
        setDeck(newDeck);
    }
    
    const removeFlahcardFromDeckState=(flashcardId)=>{
        let flashcards = deckDetails.flashcards;
      flashcards= flashcards.filter(f=>f.id!=flashcardId)
    console.log(flashcards)
    console.log(flashcardId)
        setDeck(oldDeckDetails=>({
            ...oldDeckDetails,
          flashcards : flashcards
        }
        ))
    }

    return (
    <DeckContext.Provider  value={{deck:deckDetails, setDeckDetailed,removeFlahcardFromDeckState}}>
         {children}
    </DeckContext.Provider>
    )
}