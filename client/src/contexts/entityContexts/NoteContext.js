import { createContext } from "react";

import { useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({children})=>{
      let [note,setNote] = useState({});
      
      const setNoteDetailed = (newNote)=>{
        setNote(newNote);
      }

      const detachTagFromNoteState =(tagId)=>{
           const tags = note.tags.filter(t=>t.id!=tagId);
           setNote(oldState=>({
            ...oldState,
             tags:tags
           }))
      }

      return (
      <NoteContext.Provider value={{note, setNoteDetailed,detachTagFromNoteState}} >
       {children}
      </NoteContext.Provider>
      )

}