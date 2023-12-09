import {get,post,put,del} from "../../../utils/requester";

const endpointUrl = 'https://learnmeserver.azurewebsites.net/api/mindmap';

export const getMindmapDetails =(mindmapId)=>get(`${endpointUrl}/details/${mindmapId}`)

export const createMindmap = (data)=> post(`${endpointUrl}/create`,data);

export const updateMindmap =(mindmapId,data)=>put(`${endpointUrl}/update/${mindmapId}`,data)

export const saveMindmap =(mindmapId,data)=>put(`${endpointUrl}/save/${mindmapId}`,data)

export const deleteMindmap = (mindmapId)=> del(`${endpointUrl}/delete/${mindmapId}`);