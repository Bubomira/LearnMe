import { createContext } from "react";

export const DeckContext = createContext();

export const DeckProvider = ({children})=>{
    let [deckDetails,setDeck] =useLokalStorageAuth({

    });

    const setDeckDetailed = (newDeck)=>{
        setDeck(newDeck);
    }

    return (
    <DeckProvider.Provider  value={{deck:deck, setDeckDetailed}}>
         {children}
    </DeckProvider.Provider>
    )
}