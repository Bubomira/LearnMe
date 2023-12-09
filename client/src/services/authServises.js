import { post ,get} from "../utils/requester";

const endpointUrl ='https://learnmeserver.azurewebsites.net/api/auth'

export const login=(data) => post(`${endpointUrl}/login`,data);

export const register = (data)=>post(`${endpointUrl}/register`,data);

export const logout = async()=> {
    var response  = await fetch(`${endpointUrl}/logout`,
    {headers:{
        'Authorization':JSON.parse(localStorage.getItem('user')).token
    }
    })

    if(response.status==401 || response.status==403){
        return;
    }
}
