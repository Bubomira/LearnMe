import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MindmapCollection from "../MindmapCollection/MindmapCollection";

import { getOwnedMindmaps } from "../../../../../services/entityService/mindmapService/mindmapUserService";
import useLoader from "../../../../../hooks/useLoader";

export default function OwnedMindmapCollection(){

    const navigate = useNavigate();

    let [ownedMindmaps,setOwnedMindmaps] = useState([]);

    let [loader,setLoader] = useLoader();

    useEffect(()=>{
        getOwnedMindmaps().then(mindmaps=>{
            setOwnedMindmaps(mindmaps);
            setLoader(true);            
        }).catch(err=>{
            navigate('/404')
        })
    },[])
    
    return <MindmapCollection mindmaps={ownedMindmaps} areOwned={true} loader={loader} firstTimeSearhed={true}/>
}