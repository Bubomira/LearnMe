import { post ,get} from "../utils/requester";

const endpointUrl ='https://learnmeserver.azurewebsites.net/api/events'

export const getEvents=()=>get(`${endpointUrl}/get`);

export const saveEvents = (eventsJSON)=>post(`${endpointUrl}/save`,eventsJSON);