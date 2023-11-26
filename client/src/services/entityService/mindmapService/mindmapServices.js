import {get,post,put,del} from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/mindmap';

export const createMindmap = (data)=> post(`${endpointUrl}/create`,data);
