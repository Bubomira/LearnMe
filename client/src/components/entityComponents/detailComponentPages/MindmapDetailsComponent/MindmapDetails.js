import './MindmapDetails.css'
import 'reactflow/dist/style.css';

import {ReactFlow,MiniMap,Background} from 'reactflow';

import { useEffect,useContext } from "react"

import { useNavigate, useParams } from 'react-router-dom';

import { nodeTypes,edgeTypes } from '../../../../utils/mindmapTypes';

import { MindmapContext } from '../../../../contexts/entityContexts/MindmapContext';

import { DiagramContext } from '../../../../contexts/DiagramContext';

import { likeMindmap,dislikeMindmap } from '../../../../services/entityService/mindmapService/mindmapUserService';

import { getMindmapDetails,deleteMindmap } from '../../../../services/entityService/mindmapService/mindmapServices';

import TagSection from "../TagDetailsComponent/TagSectionComponent/TagSection";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons';
import { detachTagFromMindmap } from '../../../../services/entityService/mindmapService/mindmapAdditionalService';

export default function MindmapDetails(){

    let navigate = useNavigate();
    
    let {mindmapId} =useParams();

    let {mindmap,setMindmapDetailed,detachTagFromMindmapState} = useContext(MindmapContext); 

    let {nodes,edges,onEdgesChange,onNodesChange,onConnectStart,onConnectEnd} = useContext(DiagramContext)
   
   useEffect(()=>{
       getMindmapDetails(mindmapId).then(mindmapDetailed=>{
           setMindmapDetailed(mindmapDetailed)    
       }).catch(err=>{
           navigate('/404')
       })
        
   },[mindmapId])
   const deleteMindmapHandler=()=>{
    if(window.confirm('Would you like to delete this mindmap?')){
       deleteMindmap(mindmapId).then(()=>{
        navigate('/welcome')
       }).catch(err=>{
        navigate('/404')
       })
    }
}

const likeMindmapHandler = ()=>{
    likeMindmap(mindmapId).then(()=>{
        navigate('/welcome')
    }).catch(err=>{
        navigate('/404')
    })
}

const dislikeMindmapHandler = ()=>{
    dislikeMindmap(mindmapId).then(()=>{
        navigate('/welcome')
    }).catch(err=>{
        navigate('/404')
    })
}

const detachTagFromMindmapHandler = (tagId)=>{
    detachTagFromMindmap(mindmapId,tagId).then(()=>{
        detachTagFromMindmapState(tagId);
    }).catch(err=>{
        navigate('/404')
    })
}

    return(
      <section className="mindmap-details">
         <header className="mindmap-header">
        <section className="mindmap-name-info">
            <h1>{mindmap?.name}</h1>
            {mindmap?.isOwnedByUser?
              <OwnerButtons entityId={mindmap?.id} entityType={'mindmap'} deleteHandler={deleteMindmapHandler} />:
              <LikeButtons likeHandler={likeMindmapHandler} dislikeHandler={dislikeMindmapHandler} isLiked={mindmap?.isLikedByUser}/>
            }
        </section>
         <TagSection info={mindmap} entityType={'mindmap'} detachTag={detachTagFromMindmapHandler}/> 
     </header>
     <main className='diagram-container'>
           <ReactFlow
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
           >
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
           </ReactFlow>
     </main>
      </section>
    )
}
