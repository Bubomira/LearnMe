import {post} from "../../../utils/requester";

const endpointUrl = 'https://learnmeserver.azurewebsites.net/api/mindmap/tag';

export const attachTagToMindmap = (mindmapId,tagName) => post(`${endpointUrl}/attach/tag/${mindmapId}`,tagName);

export const detachTagFromMindmap = (mindmapId,tagId)=>post(`${endpointUrl}/detach/tag/${mindmapId}`,tagId);