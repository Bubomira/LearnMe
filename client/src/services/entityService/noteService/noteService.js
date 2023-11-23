import {get, post,put,del } from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/note';

export const createNote = (data)=> post(`${endpointUrl}/create`,data)