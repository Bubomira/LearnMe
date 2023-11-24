import CreateTag from "../CreateTag";

import { useNavigate,useParams } from "react-router-dom";

import { attachTagToDeck } from "../../../../../../services/entityService/deckService/deckAditionalService";

export default function AttachTagToDeck(){

    const navigate = useNavigate();

    const {deckId} = useParams();

    const onAttachTagHandler = (e,tagName)=>{
        e.preventDefault();
        attachTagToDeck(deckId,tagName).then(()=>{
            navigate(`/deck/${deckId}`)
        }).catch(()=>{
            navigate('/404')
        })     
    } 

    return <CreateTag attachTagHandler={onAttachTagHandler} />
}