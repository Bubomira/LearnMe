const client_id = '8e6dd88313c14b24baa8e19b589d0da4';
const client_secret = '494ebd99d0ec4fe9b1af4bee2e4e44b9';

const baseUrl = 'https://accounts.spotify.com'


export const getAccessToken=async()=>{

    const res = await fetch(`${baseUrl}/api/token`,{
       method:'POST',
       headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`       
    })

    if(res.ok){
        return res.json();
    }

}