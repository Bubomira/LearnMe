import { useStoreApi,useReactFlow } from 'reactflow';

import { shallow } from 'zustand/shallow';

import useDiagram from '../hooks/useDiagram';

import { createContext,useRef,useCallback } from "react";

export const DiagramContext = createContext();


export const DiagramProvider=({children})=>{

    const {project} = useReactFlow();

    const store = useStoreApi();
    
const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    addChildNode:state.addChildNode,
    onNodesLoad:state.onNodesLoad,
    onEdgesLoad:state.onEdgesLoad,
  });


  let { nodes, edges, onNodesChange, onEdgesChange,addChildNode,onEdgesLoad,onNodesLoad} = useDiagram(
    selector,
    shallow,
  );

  const onLoadFromDatabase =(nodes,edges)=>{
          onNodesLoad(nodes);
           onEdgesLoad(edges)
  }


  const getChildNodePosition = (event, parentNode) => {
    const { domNode } = store.getState();
   
    if (
      !domNode ||
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ) {
      return;
    }
   
    const { top, left } = domNode.getBoundingClientRect();

    const panePosition = project({
      x: event.clientX - left,
      y: event.clientY - top,
    });

    return {
      x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
    };
  };

  const connectingNodeId = useRef(null);

  const onConnectStart= useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  
 
const onConnectEnd = useCallback(
  (event) => {
    const { nodeInternals } = store.getState();
    const targetIsPane = (event.target).classList.contains(
      'react-flow__pane',
    );
 
    const node = (event.target ).closest('.react-flow__node');
 
    if (node) {
      node.querySelector('input')?.focus({ preventScroll: true });
    } else if (targetIsPane && connectingNodeId.current) {
      const parentNode = nodeInternals.get(connectingNodeId.current);
      const childNodePosition = getChildNodePosition(event, parentNode);
 
      if (parentNode && childNodePosition) {
        addChildNode(parentNode, childNodePosition);
      }
    }
  },
  [getChildNodePosition],
);


    return(
        <DiagramContext.Provider value={{nodes:nodes,edges:edges, onNodesChange, onEdgesChange,onConnectStart,onConnectEnd,onLoadFromDatabase}}>
            {children}
        </DiagramContext.Provider>
    )

}
