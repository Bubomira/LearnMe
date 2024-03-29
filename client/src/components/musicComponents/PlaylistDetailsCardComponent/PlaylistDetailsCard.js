import './PlaylistDetailsCard.css'

import { useEffect,useState } from 'react'

import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useParams,useNavigate } from 'react-router-dom'

import { getPlaylistDetails } from '../../../services/musicServices'
import PlaylistTrackComponent from './PlaylistTrackComponent/PlaylistTrack';

import useMusicAuth from '../../../hooks/useMusicAuth'
import { useInterval } from 'usehooks-ts'
import useLoader from '../../../hooks/useLoader'

import Loader from '../../loader/Loader'

export default function PlaylistDetailsCard(){

    let [timer,setTimer] = useState(0);

    let [currentTrack,setCurrentTrack] = useState({
        trackUrl:'',
        trackName:'',
        trackImg:''
    });

    let [loader,setLoader] = useLoader();

    const [getToken] = useMusicAuth({});

    let [detailedPlaylist,setDetailedPlaylist] = useState({});

    const navigate = useNavigate();

    const {playlistId} = useParams();

    useEffect(()=>{
        getToken().then(()=>{
            getPlaylistDetails(playlistId).then(playlist=>{
                setDetailedPlaylist({
                    name:playlist.name,
                    imgUrl:playlist?.images[0].url,
                    description:playlist.description,
                    tracks: playlist?.tracks?.items.filter(item=>item?.track.preview_url!=null)               
                })
                setLoader(true)
            }).catch(err=>{
                navigate('/404')
            })
        })
        },[])

    useInterval(()=>{
        setTimer(oldValue=>oldValue+=1)
    },3000000)

    useEffect(()=>{
         getToken();
    },[timer])


    const playFromChild = (e,trackUrl,trackName,trackImg)=>{    
        setCurrentTrack({
            trackUrl:trackUrl,
            trackName:trackName,
            trackImg:trackImg
        });
    }

    const playInQueue = ()=>{
       let counter = 1;
       let firstTrack =  detailedPlaylist?.tracks[0].track;
       setCurrentTrack({
        trackImg:firstTrack?.album?.images[0].url,
        trackName:firstTrack?.name,
        trackUrl:firstTrack?.preview_url
    })
        setInterval(()=>{
            let track = detailedPlaylist?.tracks[counter].track;
           setCurrentTrack({
               trackImg:track?.album?.images[0].url,
               trackName:track?.name,
               trackUrl:track?.preview_url
           })
           counter++;
        },30000)
    }

    return (
        !loader?
        <Loader/>
        :
        <article className="playlist-details-card">
            <header className="playlist-details-metadata">
                <img src={detailedPlaylist?.imgUrl} alt="" />
                <section className="playlist-detailed-text">
                    <h2 className="playlist-detailed-name">{detailedPlaylist?.name}</h2>
                    <p className="playlist-detailed-description">{detailedPlaylist?.description}</p>
                    <button onClick={playInQueue} className='play-btn'><FontAwesomeIcon icon={faPlay}/><span>Пусни</span></button>
                </section>               
            </header>
            <section className='playlist-tracks'>
                    {detailedPlaylist?.tracks.map(item=><PlaylistTrackComponent onClickImg={playFromChild} track={item?.track} key={item?.track.id} />)}
            </section>
            <section className="play">
                {currentTrack.trackName!=''?
               <section className='current-track-info'>
                  <img src={currentTrack.trackImg} alt="track" />
                   <p>{currentTrack.trackName}</p>          
               </section>
               :
               <p className='no-track-chosen'>Избери си парче като кликнеш на неговата снимка!</p>
                }
               <audio autoPlay  src={currentTrack?.trackUrl}></audio>
           
            </section>
        </article>
    )
   
}