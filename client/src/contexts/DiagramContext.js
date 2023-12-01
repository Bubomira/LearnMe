import { createContext,useState } from "react";

import {Diagram,ShapeNode} from '@mindfusion/diagramming'


export const DiagramContext = createContext();

export const DiagramProvider = ({children})=>{

    var shapeNames  = ['Actor','Alternative','Arrow3','Arrow5','Arrow8','Arrow9','Cloud','ConeUp','Cube','Cyllinder','']
    let [diagram,setDiagram] = useState(new Diagram());

    let [nodes,setNodes] = useState([])

    const setNodesDiagram =()=>{
        const shapes = [];
        for (let index = 0; index < shapeNames.length; index++) {
           const shapeName = shapeNames[index]
           var node =new ShapeNode(diagram);
           node.shape=shapeName
           shapes.push(node)
        }
         setNodes(shapes)  
    }

    return (
    <DiagramContext.Provider  value={{diagram:diagram,nodes:nodes,setNodesDiagram,shapeNames}}>
         {children}
    </DiagramContext.Provider>
    )
}