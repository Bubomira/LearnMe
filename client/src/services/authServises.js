import { post ,get} from "../utils/requester";

const endpointUrl ='https://localhost:7065/api/auth'

export const login=(data) => post(`${endpointUrl}/login`,data);

export const register = (data)=>post(`${endpointUrl}/register`,data);

export const logout = ()=> get(`${endpointUrl}/logout`)
