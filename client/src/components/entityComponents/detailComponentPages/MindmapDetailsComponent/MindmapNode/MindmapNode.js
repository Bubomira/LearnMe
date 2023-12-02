import './MindmapNode.css'

import useStore from '../../../../../hooks/useDiagram';

import { Handle, Position } from 'reactflow';

export const NodeData = {
    label: ''
  };
   
export const MindmapNode=({ id, data })=>{

    const updateNodeLabel = useStore((state)=>state.updateNodeLabel)
    return (
        <>
          <input defaultValue={data.label}  onChange={(e)=>updateNodeLabel(id,e.target.value)}/>
     
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
        </>
    )
}