import { post } from "../../utils/requester";

const endpointUrl ='https://localhost:7065/api/flashcard'


export const addFlashcard = (data)=>post(`${endpointUrl}/create`,data)