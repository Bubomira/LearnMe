import './MindmapNode.css'

import { Handle, Position } from 'reactflow';

export const NodeData = {
    label: ''
  };
   
export const MindmapNode=({ id, data })=>{
    return (
        <>
          <input defaultValue={data.label} />
     
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
        </>
    )
}