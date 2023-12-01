import '../Edit.css'

import { useNavigate,useParams } from "react-router-dom"

import { useContext ,useEffect} from "react"

import { MindmapContext } from "../../../../contexts/entityContexts/MindmapContext"

import { getMindmapDetails,updateMindmap } from "../../../../services/entityService/mindmapService/mindmapServices"

import useChangeInput from "../../../../hooks/useChangeInput"

export default function EditMindmap(){
    
    const navigate = useNavigate();

    const {mindmapId} =useParams();

    const {mindmap,setMindmapDetailed} = useContext(MindmapContext);

    useEffect(()=>{
        getMindmapDetails(mindmapId).then(mindmapToBeEdited=>{
            setMindmapDetailed(mindmapToBeEdited)
        }).catch(err=>{
            navigate('/404')
        })

    },[mindmapId])

    let [values,setValues]=useChangeInput({
        Name:mindmap?.name
    })

    const onSubmitHandler =(e)=>{
        e.preventDefault();
        updateMindmap(mindmap?.id,values.Name).then(()=>{
            navigate(`/mindmap/${mindmap?.id}`)
        }).catch(err=>{
            navigate('/404')
        })
    }

    return(
        <form className='edit-form edit-deck-mindmap' onSubmit={onSubmitHandler} >
        <h2 className='edit-heading'>Edit mindmap</h2>
        <input className='edit-input'
        type='text'
        name='Name'
        placeholder='new Mindmap name'
        defaultValue={mindmap?.name}
        onChange={setValues}
          />
          <input className='edit-button' type="submit" value="Edit" />
          
    </form>
    )
}