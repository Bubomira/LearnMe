import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MindmapCollection from "../MindmapCollection/MindmapCollection";

import { getLikedMindmaps } from "../../../../../services/entityService/mindmapService/mindmapUserService";
import useLoader from "../../../../../hooks/useLoader";

export default function LikedMindmapsCollection(){

    const navigate = useNavigate();

    let [likedMindmaps,setLikedMindmaps] = useState([]);

    let [loader,setLoader] = useLoader();

    useEffect(()=>{
        getLikedMindmaps().then(mindmaps=>{
            setLikedMindmaps(mindmaps)
            setLoader(true);
        }).catch(err=>{
            navigate('/404')
        })
    },[])

  
    
    return <MindmapCollection mindmaps={likedMindmaps} areOwned={false} loader={loader} firstTimeSearhed={true}/>
}