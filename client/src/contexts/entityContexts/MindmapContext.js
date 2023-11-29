import { createContext , useState} from "react";

export const MindmapContext = createContext();

export const MindmapProvier =({children})=>{
    let [mindmap,setMindmap] = useState();

    const setMindmapDetailed =(mindmapDetailed)=>{
        setMindmap(mindmapDetailed)
    }
    
        return(
            <MindmapContext.Provider value={{mindmap:mindmap,setMindmapDetailed}}>
               {children}
            </MindmapContext.Provider>
        )
    

}