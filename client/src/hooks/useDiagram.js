import {
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import { create } from 'zustand';


 
const useStore = create((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'mindmap',
      data: { label: 'React Flow Mind Map' },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addChildNode: (parentNode, position) => {
    const newNode = {
      id: "id" + Math.random().toString(16).slice(2),
      type: 'mindmap',
      data: { label: 'New Node' },
      position,
      parentNode: parentNode.id,
    };
   
    const newEdge = {
      id: "id" + Math.random().toString(16).slice(2),
      source: parentNode.id,
      target: newNode.id,
    };
   
    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  } 
}));
 
export default useStore;