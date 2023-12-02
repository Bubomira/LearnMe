import '../../MindmapDetails.css'

import { BaseEdge, getStraightPath } from 'reactflow';
 
export default function MindmapEdge(props) {
  const { sourceX, sourceY, targetX, targetY } = props;
 
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY:sourceY,
    targetX,
    targetY,
  });
 
  return <BaseEdge path={edgePath} {...props} />;
}
 