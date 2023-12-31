import mindmap from '../../../../../static/img/mindmaps.jpg'

import { useNavigate } from 'react-router-dom';

import useChangeInput from '../../../../../hooks/useChangeInput'

import { createMindmap } from '../../../../../services/entityService/mindmapService/mindmapServices';

export default function CreateMindmap(){
    
    const navigate = useNavigate();

    const [values,setValues] = useChangeInput({
        Name:'',
        Tags:''
    });

    const onSubmitHandler = (e)=>{
       e.preventDefault();
       const tags= values.Tags.split(/\s+/)
       createMindmap({Name:values.Name,Tags:tags}).then(mindmap=>{
           navigate(`/mindmap/${mindmap.id}`)
       }).catch(err=>{
        navigate('/404')
       })
    }

    return(
        <section className="site-wrapper">
        <section className="create-wrapper">
        <img width={'40%'}  src={mindmap} alt="decks" />
        <section className="create-form-holder">
            <h2>Create Mindmap</h2>
            <form className="create-form" onSubmit={onSubmitHandler} >
            <input
              className='create-input'
                 type="text"
                 name="Name"
                 id="name"
                 placeholder="Name of mindmap"
                 onChange={setValues}
                />
                <input
                className='create-tags create-input'
                 type="text"
                 name="Tags"
                 id="tags"
                 placeholder="Tags that depict your mindmap!"
                 onChange={setValues}
                />
                <button className='creates-btn' type="submit">Submit</button>
            </form>
        </section>
        </section>
        </section>
    )
}