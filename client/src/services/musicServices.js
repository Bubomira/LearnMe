const client_id = '8e6dd88313c14b24baa8e19b589d0da4';
const client_secret = '494ebd99d0ec4fe9b1af4bee2e4e44b9';

const user_id = `31i3kbxrx4q5ygd7t6uyxzrz65dq`
const authUrl = 'https://accounts.spotify.com'

const baseUrl='https://api.spotify.com/v1'

export const getAccessToken=async()=>{

    const res = await fetch(`${authUrl}/api/token`,{
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

export const getPlaylists = async()=>{
    const musicToken = JSON.parse(localStorage.getItem('musicToken')).access_token;

    const res  = await fetch(`${baseUrl}/users/${user_id}/playlists`,{
        headers:{
            'Authorization':`Bearer ${musicToken}`
        }
    })
    if(res.ok){
        return res.json();
    }
}

export const getPlaylistDetails = async(playlistId)=>{
    const musicToken = JSON.parse(localStorage.getItem('musicToken')).access_token;

    const res  = await fetch(`${baseUrl}/playlists/${playlistId}`,{
        headers:{
            'Authorization':`Bearer ${musicToken}`
        }
    })
    if(res.ok){
        return res.json();
    }
}
