import '../../MindmapDetails.css'

import useStore from '../../../../../../hooks/useDiagram';

import { Handle, Position } from 'reactflow';

import { useLayoutEffect,useRef,useEffect } from 'react';

export const NodeData = {
    label: ''
  };
   
export const MindmapNode=({ id, data })=>{ 

  const inputRef = useRef(null);

    const updateNodeLabel = useStore((state)=>state.updateNodeLabel)

    useEffect(() => {
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 1);
    }, []);
  

    useLayoutEffect(() => {
      if (inputRef.current) {
        inputRef.current.style.width = `${data.label.length * 8}px`;
      }
    }, [data.label.length]);

    return (
      <div className='node-wrapper'>
        <div className='grow-wrapper'>
           <textarea
            defaultValue={data.label}
            onChange={(e)=>updateNodeLabel(id,e.target.value)}
            className='node-input'
            ref={inputRef}
            />
        </div>
           <Handle type="target" position={Position.Top} />
           <Handle type="source" position={Position.Bottom} />
      </div>
    )
}