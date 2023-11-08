import { post } from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/deck/additional';

export const removeFlashcardFromDeck=(deckId,data)=>post(`${endpointUrl}/remove/flashcard/from/deck/${deckId}`,data)

export const detachTagFromDeck = (deckId,data)=>post(`${endpointUrl}/detach/tag/${deckId}`,data)

export const attachTagToDeck = (deckId,data)=>post(`${endpointUrl}/attach/tag/${deckId}`,data)