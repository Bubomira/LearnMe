import {get, post,put,del } from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/note';

export const getNoteDetails =(noteId)=>get(`${endpointUrl}/details/${noteId}`)

export const createNote = (data)=> post(`${endpointUrl}/create`,data)

export const updateNote = (noteId,data)=>put(`${endpointUrl}/update/${noteId}`,data)

export const deleteNote = (noteId)=>del(`${endpointUrl}/delete/${noteId}`)