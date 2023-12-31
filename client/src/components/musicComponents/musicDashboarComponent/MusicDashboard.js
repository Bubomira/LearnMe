import './MusicDashboard.css'

import { useEffect,useState } from "react";
import { getPlaylists } from "../../../services/musicServices";
import PlaylistPreviewCard from './PlaylistPreviewCardComponent/PlaylistPreviewCard';

import useMusicAuth from '../../../hooks/useMusicAuth';
import useLoader from '../../../hooks/useLoader';

import Loader from '../../loader/Loader';

export default function MusicDashboard(){

    let [studyPlaylists,setStudyPlaylists] = useState([]);

    let [loader,setLoader] = useLoader()

    const [getToken] = useMusicAuth({});

    useEffect(()=>{
        getToken().then(()=>{
            getPlaylists().then(playlists=>{
                setStudyPlaylists(playlists?.items)
                setLoader(true)
            })
        })
    },[])

  return(
    <section className="playlist-section">
        <header className="playlist-section-header">
            <h1>Study playlists to help you concertrate!</h1>
        </header>
        {!loader?
        <Loader/>
          :
        <main className="playlists-section-collection">
            {
            studyPlaylists?.length>0?
            studyPlaylists.map(playlist=><PlaylistPreviewCard playlist={playlist} key={playlist.id}/>)
            :
            <></>
            }
        </main>
    }
    </section>
  )

}