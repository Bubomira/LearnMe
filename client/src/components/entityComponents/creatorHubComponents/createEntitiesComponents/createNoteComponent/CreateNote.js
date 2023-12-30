import '../Create.css'
import './CreateNote.css'
import notes from '../../../../../static/img/notes.jpg'

import { useNavigate } from 'react-router-dom';

import { recognise } from '../../../../../utils/recognise';

import useChangeInput from "../../../../../hooks/useChangeInput"
import { createNote } from '../../../../../services/entityService/noteService/noteService';

export default function CreateNote(){
    const navigate= useNavigate();

    const [values,setValues] =useChangeInput({
        Title:'',
        Tags:'',
        ImageChecked:true,
        ImageUrl:'',
        Content:''
    });

    const onSubmit = async(e)=>{
         e.preventDefault();
         if(!values.Title || !values.Tags || (!values.ImageChecked && !values.Content)){
            alert('Please fill in all fields!')
         }else{
            const content = values.ImageChecked? 
            await recognise(values.ImageUrl).catch(err=>{alert('Unable to convert')}) 
            : values.Content;
            const tags=values.Tags.split(/\s+/);
            createNote({Tags:tags,Title:values.Title,Content:content}).then(()=>{
                navigate('/owned/notes')
            }).catch(err=>{        
                navigate('/404')
            })
         }
    }
    return(
        <section className="site-wrapper">
        <div className="create-wrapper create-note">
        <img width='30%' src={notes} alt="decks" />
        <section className="create-form-holder  create-note-form-holder">
            <h2>Create Note</h2>
            <form className="create-form create-note-form" onSubmit={onSubmit}>
              <input
              className='create-input create-note-input'
                 type="text"
                 name="Title"
                 id="title"
                 placeholder="Note Title"
                 onChange={setValues}
                />
                <input
                className=' create-input create-note-input'
                 type="text"
                 name="Tags"
                 id="tags"
                 placeholder="Few tags that describe your note!"
                 onChange={setValues}
                />
                <section className='radio-section'>
                    <article className='radio-holder'>
                         <label htmlFor="image">Extract content from image</label>
                         <input
                          type="radio"
                          name="ImageChecked"
                          id="image"
                          defaultChecked={true}
                          onChange={setValues}
                          />
                    </article>
                    <article className='radio-holder'>
                          <label htmlFor="text">Type content directly</label>
                          <input
                          type="radio"
                          name="ImageChecked"
                          id="text"
                         onChange={setValues}
                />
                    </article>             
                </section>
                {values.ImageChecked?
                      <input
                      className=' create-input'
                      type="file"
                      name="file"
                      id="file"
                      onChange={setValues}
                      accept="image/png, image/gif, image/jpeg"
                     />
                     :
                     <textarea
                      className=' create-input'
                      type="text"
                      name="Content"
                      id="note-content"
                      placeholder="The content of your note"
                      onChange={setValues}
                      />
                }
                <button className='creates-btn' type="submit">Submit</button>
            </form>
        </section>
       </div>
       </section>
     )
}