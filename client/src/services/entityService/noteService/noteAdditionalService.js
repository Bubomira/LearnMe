import {post} from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/note/tag';

export const attachTagToNote = (noteId,tagName) => post(`${endpointUrl}/attach/tag/${noteId}`,tagName);

export const detachTagFromNote = (noteId,tagId)=>post(`${endpointUrl}/detach/tag/${noteId}`,tagId);