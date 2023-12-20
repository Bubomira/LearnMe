import { useEffect,useState } from "react";
import { getPlaylists } from "../../../services/musicServices";

export default function MusicDashboard(){

    let [studyPlaylists,setStudyPlaylists] = useState([]);

    useEffect(()=>{
        getPlaylists().then(playlists=>{
            console.log(playlists)
        })

    },[])

  return <h1></h1>
  
}