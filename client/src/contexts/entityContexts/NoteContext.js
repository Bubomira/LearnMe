import { createContext } from "react";

import { useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({children})=>{
      let [note,setNote] = useState({});
      
      const setNoteDetailed = (newNote)=>{
        setNote(newNote);
      }

      return (
      <NoteContext.Provider value={{note, setNoteDetailed}} >
       {children}
      </NoteContext.Provider>
      )

}