import './PlaylistDetailsCard.css'

import { useEffect,useState } from 'react'

import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useParams,useNavigate } from 'react-router-dom'

import { getPlaylistDetails, getTrackFullInfo } from '../../../services/musicServices'
import PlaylistTrackComponent from './PlaylistTrackComponent/PlaylistTrack';

export default function PlaylistDetailsCard(){

    let [currentTrack,setCurrentTrack] = useState({
        trackUrl:'',
        trackName:'',
        trackImg:''
    });

    let [detailedPlaylist,setDetailedPlaylist] = useState();

    const navigate = useNavigate();

    const {playlistId} = useParams();

    useEffect(()=>{
        getPlaylistDetails(playlistId).then(playlist=>{
            setDetailedPlaylist(playlist)
        }).catch(err=>{
            navigate('/404')
        })
    },[])

    const playFromChild = (e,trackUrl,trackName,trackImg)=>{    
        setCurrentTrack({
            trackUrl:trackUrl,
            trackName:trackName,
            trackImg:trackImg
        });
    }

    return (
        <article className="playlist-details-card">
            <header className="playlist-details-metadata">
                <img src={detailedPlaylist?.images[0].url} alt="" />
                <section className="playlist-detailed-text">
                    <h2 className="playlist-detailed-name">{detailedPlaylist?.name}</h2>
                    <p className="playlist-detailed-description">{detailedPlaylist?.description}</p>
                    <button className='play-btn'><FontAwesomeIcon icon={faPlay}/><span>Play</span></button>
                </section>
                
            </header>
            <section className='playlist-tracks'>
                    {detailedPlaylist?.tracks?.items.map(item=><PlaylistTrackComponent onClickImg={playFromChild} track={item?.track} key={item?.track.id} />)}
            </section>
            <section className="play">
                {currentTrack.trackName!=''?
               <section className='current-track-info'>
                  <img src={currentTrack.trackImg} alt="track" />
                   <p>{currentTrack.trackName}</p>          
               </section>
               :
               <p className='no-track-chosen'>Preview a track by clicking on its icon!</p>
                }
               <audio autoPlay src={currentTrack?.trackUrl}></audio>
           
            </section>
        </article>
    )
   
}