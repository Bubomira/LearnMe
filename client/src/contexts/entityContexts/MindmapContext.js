import { createContext , useState} from "react";

export const MindmapContext = createContext();

export const MindmapProvier =({children})=>{
    let [mindmap,setMindmap] = useState();

    const setMindmapDetailed =(mindmapDetailed)=>{
        setMindmap(mindmapDetailed)
    }

    const detachTagFromMindmapState = (tagId)=>{
        const filteredTags = mindmap.tags.filter(tag=>tag.id!=tagId);

        setMindmap(oldState=>({
            ...oldState,
            tags:filteredTags
        }))
    }

    const changeIsLikedFromUser=(isLikedByCurrentUser)=>{
        setMindmapDetailed(oldstate=>({
             ...oldstate,
             isLikedByUser:isLikedByCurrentUser
        }))
      }

    
        return(
            <MindmapContext.Provider value={{mindmap:mindmap,setMindmapDetailed,detachTagFromMindmapState,changeIsLikedFromUser}}>
               {children}
            </MindmapContext.Provider>
        )
    

}