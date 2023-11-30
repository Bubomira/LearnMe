import './MindmapDetails.css'

import { DiagramView,NodeListView} from '@mindfusion/diagramming-react';

import { useEffect,useContext } from "react"

import { useNavigate,useParams } from "react-router-dom";

import { DiagramContext } from '../../../../contexts/DiagramContext';

import { MindmapContext } from "../../../../contexts/entityContexts/MindmapContext"

import { getMindmapDetails } from "../../../../services/entityService/mindmapService/mindmapServices";
import TagSection from "../TagDetailsComponent/TagSectionComponent/TagSection";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons';

export default function MindmapDetails(){

    const navigate = useNavigate();

    let {mindmapId} =useParams();

    let {mindmap,setMindmapDetailed} = useContext(MindmapContext);

    let {nodes,diagram,setNodesDiagram,shapeNames} = useContext(DiagramContext)
    
    
    useEffect(()=>{
            setNodesDiagram();         
        getMindmapDetails(mindmapId).then(mindmapDetailed=>{
             setMindmapDetailed(mindmapDetailed)
        }).catch(err=>{
            navigate('/404')
        })
         
    },[mindmapId])

    console.log(nodes)

    return(
      <section className="mindmap-details">
         <header className="mindmap-header">
        <section className="mindmap-name-info">
            <h1>{mindmap?.name}</h1>
            {mindmap?.isOwnedByUser?
              <OwnerButtons entityId={mindmap?.id} entityType={'mindmap'}/>:
              <LikeButtons />
            }
        </section>
         <TagSection info={mindmap} entityType={'mindmap'}/> 
     </header>
     <main className='diagram-container'>
          <section className='node-list-container'>
          {nodes.isDummy?
           <NodeListView nodes={nodes} captions={shapeNames} ></NodeListView>
           :
           <></>
          }
          </section>
          <section className='diagram'>
            <DiagramView defaultShape={'circle'}  diagram={diagram} id={`diagram/${mindmap?.id}`}/>
          </section>


     </main>
      </section>
    )
}