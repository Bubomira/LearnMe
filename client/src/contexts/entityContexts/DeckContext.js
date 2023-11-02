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
        setDeck(oldDeckDetails=>({
            ...oldDeckDetails,
          flashcards : flashcards
        }
        ))
    }

    const detachTagFromDeckState = (tagId)=>{
        let tags = deckDetails.tags;
      tags= tags.filter(f=>f.id!=tagId)
        setDeck(oldDeckDetails=>({
            ...oldDeckDetails,
          tags : tags
        }
        ))
    }

    return (
    <DeckContext.Provider  value={{deck:deckDetails, setDeckDetailed,removeFlahcardFromDeckState,detachTagFromDeckState}}>
         {children}
    </DeckContext.Provider>
    )
}