import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MindmapCollection from "../MindmapCollection/MindmapCollection";

import { getLikedMindmaps } from "../../../../../services/entityService/mindmapService/mindmapUserService";

export default function LikedMindmapsCollection(){

    const navigate = useNavigate();

    let [likedMindmaps,setLikedMindmaps] = useState([]);

    useEffect(()=>{
        getLikedMindmaps().then(mindmaps=>{
            setLikedMindmaps(mindmaps)
        }).catch(err=>{
            navigate('/404')
        })
    },[])

  
    
    return <MindmapCollection mindmaps={likedMindmaps} areOwned={false}/>
}