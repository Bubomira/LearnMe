import {post} from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/mindmap/tag';

export const attachTagToMindmap = (mindmapId,tagName) => post(`${endpointUrl}/attach/tag/${mindmapId}`,tagName);

export const detachTagFromMindmap = (mindmapId,tagId)=>post(`${endpointUrl}/detach/tag/${mindmapId}`,tagId);