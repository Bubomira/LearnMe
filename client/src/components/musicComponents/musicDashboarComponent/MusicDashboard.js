import './MusicDashboard.css'

import { useEffect,useState } from "react";
import { getPlaylists } from "../../../services/musicServices";
import PlaylistPreviewCard from './PlaylistPreviewCardComponent/PlaylistPreviewCard';

import useMusicAuth from '../../../hooks/useMusicAuth';

export default function MusicDashboard(){

    let [studyPlaylists,setStudyPlaylists] = useState([]);

    const [getToken] = useMusicAuth({});

    useEffect(()=>{
        getToken().then(()=>{
            getPlaylists().then(playlists=>{
                setStudyPlaylists(playlists?.items)
            })
        })
    },[])

  return(
    <section className="playlist-section">
        <header className="playlist-section-header">
            <h1>Study playlists to help you concertrate!</h1>
        </header>
        <main className="playlists-section-collection">
            {
            studyPlaylists.length>0?
            studyPlaylists.map(playlist=><PlaylistPreviewCard playlist={playlist} key={playlist.id}/>)
            :
            <></>
            }
        </main>
    </section>
  )

}