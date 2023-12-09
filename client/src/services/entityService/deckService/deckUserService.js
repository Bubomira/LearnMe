import { get } from "../../../utils/requester";

const endpointUrl = 'https://learnmeserver.azurewebsites.net/api/deck/user';

export const likeDeck =(deckId)=>get(`${endpointUrl}/like/deck/${deckId}`);

export const dislikeDeck = (deckId)=>get(`${endpointUrl}/dislike/deck/${deckId}`)

export const getOwnedDecks = ()=>get(`${endpointUrl}/get/ownedDecks`)

export const getLikedDecks = ()=>get(`${endpointUrl}/get/likedDecks`)