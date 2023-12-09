import { get,post,put,del } from "../../utils/requester";

const endpointUrl ='https://learnmeserver.azurewebsites.net/api/flashcard'

export const addFlashcard = (data)=>post(`${endpointUrl}/create`,data)

export const getFlashcardDetails = (flashcardId) => get(`${endpointUrl}/details/${flashcardId}`)

export const deleteFlashcard = (flashcardId)=> del(`${endpointUrl}/delete/${flashcardId}`)

export const updateFlashcard = (flashcardId,data)=>put(`${endpointUrl}/update/${flashcardId}`,data)

export const searchFlashcards = (data)=>post(`${endpointUrl}/search/by/name`,data)