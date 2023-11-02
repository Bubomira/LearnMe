import { post } from "../../../utils/requester";

const endpointUrl = 'https://localhost:7065/api/deck/additional';

export const removeFlashcardFromDeck=(data)=>post(`${endpointUrl}/attach/flashcard/deck/1/${deckId}`,data)