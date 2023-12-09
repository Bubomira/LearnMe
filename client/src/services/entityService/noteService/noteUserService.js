import { get } from "../../../utils/requester";

const endpointUrl = 'https://learnmeserver.azurewebsites.net/api/note/user';

export const likeNote =(noteId)=> get(`${endpointUrl}/like/${noteId}`)

export const dislikeNote = (noteId)=> get(`${endpointUrl}/dislike/${noteId}`)

export const getOwnedNotes = ()=>get(`${endpointUrl}/owned/notes`)

export const getLikedNotes = ()=>get(`${endpointUrl}/liked/notes`)