import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MindmapCollection from "../MindmapCollection/MindmapCollection";

import { getOwnedMindmaps } from "../../../../../services/entityService/mindmapService/mindmapUserService";

export default function OwnedMindmapCollection(){

    const navigate = useNavigate();

    let [ownedMindmaps,setOwnedMindmaps] = useState([]);

    useEffect(()=>{
        getOwnedMindmaps().then(mindmaps=>{
            setOwnedMindmaps(mindmaps);
            console.log(mindmaps)
        }).catch(err=>{
            navigate('/404')
        })
    },[])
    
    return <MindmapCollection mindmaps={ownedMindmaps} areOwned={true}/>
}