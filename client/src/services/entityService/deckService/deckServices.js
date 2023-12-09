import {get, post,put,del } from "../../../utils/requester";

const endpointUrl = 'https://learnmeserver.azurewebsites.net/api/deck';

export const getDeck =(deckId)=> get(`${endpointUrl}/details/${deckId}`);

export const createDeck = (data)=>post(`${endpointUrl}/create`,data);

export const updateDeck = (deckId,data)=>put(`${endpointUrl}/update/${deckId}`,data)

export const deleteDeck =(deckId)=>del(`${endpointUrl}/delete/${deckId}`)

