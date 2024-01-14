import './MindmapDetails.css'
import 'reactflow/dist/style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSave } from '@fortawesome/free-solid-svg-icons';

import {ReactFlow,MiniMap,Background, Controls} from 'reactflow';

import { useEffect,useContext } from "react"

import { useNavigate, useParams } from 'react-router-dom';

import useLoader from '../../../../hooks/useLoader';

import { nodeTypes,edgeTypes } from '../../../../utils/mindmapTypes';

import { MindmapContext } from '../../../../contexts/entityContexts/MindmapContext';

import { DiagramContext } from '../../../../contexts/DiagramContext';

import { likeMindmap,dislikeMindmap } from '../../../../services/entityService/mindmapService/mindmapUserService';

import { getMindmapDetails,deleteMindmap,saveMindmap } from '../../../../services/entityService/mindmapService/mindmapServices';

import TagSection from "../TagDetailsComponent/TagSectionComponent/TagSection";
import OwnerButtons from '../../ButtonComponents/OwnerButtonsComponent/OwnerButtons';
import LikeButtons from '../../ButtonComponents/LikeButtonsComponent/LikeButtons';
import Loader from '../../../loader/Loader';
import { detachTagFromMindmap } from '../../../../services/entityService/mindmapService/mindmapAdditionalService';

export default function MindmapDetails(){

    let navigate = useNavigate();
    
    let {mindmapId} =useParams();

    let [loader,setLoader] = useLoader()

    let {mindmap,setMindmapDetailed,detachTagFromMindmapState} = useContext(MindmapContext); 

    let {nodes,edges,onEdgesChange,onNodesChange,onConnectStart,onConnectEnd,onLoadFromDatabase} = useContext(DiagramContext)


     const connectionLineStyle = { stroke: '#2D3142', strokeWidth: 3 };
     const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

   useEffect(()=>{
       getMindmapDetails(mindmapId).then(mindmapDetailed=>{
           setMindmapDetailed(mindmapDetailed)   
           if(mindmapDetailed.jsonDiagram){
               const diagram = JSON.parse(mindmapDetailed.jsonDiagram);
               onLoadFromDatabase(diagram.nodes,diagram.edges)
           }
           setLoader(true)
       }).catch(err=>{
        navigate('/404')
       })
        
   },[mindmapId])
   const deleteMindmapHandler=()=>{
    if(window.confirm('Наистина ли искате да изтриете тази мисловна карта?')){
       deleteMindmap(mindmapId).then(()=>{
        navigate('/welcome')
       }).catch(err=>{
        navigate('/404')
       })
    }
}

const likeMindmapHandler = ()=>{
    likeMindmap(mindmapId).then(()=>{
        alert('Успешно харесатхе!!')
    }).catch(err=>{
        navigate('/404')
    })
}

const dislikeMindmapHandler = ()=>{
    dislikeMindmap(mindmapId).then(()=>{
        alert('Успешно отхаресатхе!')
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

  const onSaveHandler=(e)=>{
    console.log('here')
    const obj = {
        nodes:nodes,
        edges:edges
    }
    saveMindmap(mindmap?.id,JSON.stringify(obj)).then(()=>{
        alert('Saved in database!')
    }).catch(err=>{
        console.log(err)
       alert('Could not save mindmap')
    })

  }

    return(
        !loader?
        <Loader/>
        :
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
            connectionLineStyle={connectionLineStyle}
            defaultEdgeOptions={defaultEdgeOptions}
           >
        <MiniMap />
        <Controls/>
        <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <button className='mindmap-save-btn' onClick={onSaveHandler}>Запази <FontAwesomeIcon color='#2D3142' icon={faSave}/></button>
     </main>
      </section>
    )
}
