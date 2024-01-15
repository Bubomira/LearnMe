import CreateTag from "../CreateTag";

import { useEffect,useContext } from "react";

import { useNavigate,useParams } from "react-router-dom";

import { MindmapContext } from "../../../../../../contexts/entityContexts/MindmapContext";

import { getMindmapDetails } from "../../../../../../services/entityService/mindmapService/mindmapServices";

import { attachTagToMindmap } from "../../../../../../services/entityService/mindmapService/mindmapAdditionalService";

import checkIfFormDataIsInvalid from "../../../../../../utils/emtyFormChecker";

export default function AttachTagToMindmap(){
    
    const navigate =useNavigate();

    let {mindmapId} = useParams();

    let {mindmap,setMindmapDetailed} = useContext(MindmapContext)


    useEffect(()=>{
        getMindmapDetails(mindmapId).then(mindmapToBeTagged=>{
            setMindmapDetailed(mindmapToBeTagged)
        })
        .catch(err=>{
            navigate('/404')
        })

    },[mindmapId])

    const onAttachTagToMindmap  =(e,tagName)=>{
        e.preventDefault();
        if(!checkIfFormDataIsInvalid({tag:tagName})){
            alert('Моля, попълнете всички полета!')
         }else{
        attachTagToMindmap(mindmap.id,tagName).then(()=>{
            navigate(`/mindmap/${mindmap.id}`)
        }).catch(err=>{
            navigate('/404')
        })
    }

    }

    return(<CreateTag   attachTagHandler={onAttachTagToMindmap} />)
}