import '../Edit.css'

import { useEffect,useContext } from 'react';

import { useParams,useNavigate } from 'react-router-dom';

import { NoteContext } from '../../../../contexts/entityContexts/NoteContext';

import useChangeInput from '../../../../hooks/useChangeInput'

import { recognise } from '../../../../utils/recognise';

import { getNoteDetails,updateNote } from '../../../../services/entityService/noteService/noteService';

export default function EditNote(){

    const navigate =useNavigate();

    const {noteId} = useParams();
    
    let {note,setNoteDetailed} = useContext(NoteContext)
    
    let [values,setValues] = useChangeInput({
            Title:note.title,
            ImageChecked:false,
            ImageUrl:'',
            Content:note.content
    });
    
    useEffect(()=>{
          getNoteDetails(noteId).then(noteToBeEdited=>{
            setNoteDetailed(noteToBeEdited);
          }).catch(err=>{
            navigate('/404')
          })
        },[noteId])
        
        
        const onEditHandler =async(e)=>{
          e.preventDefault();
           console.log(values)
            if(!values.Title ||  (!values.ImageChecked && !values.Content) || (values.ImageChecked && !values.ImageUrl)){
              alert('Моля, попълнете всички полета!')
           }else{
        
        let content = values.ImageChecked? await recognise(values.ImageUrl).catch(err=>{
            navigate('/404')
        })  : values.Content;

       updateNote(note.id,{title:values.Title,Content:content}).then(()=>{
        navigate(`/note/${note.id}`);
       }).catch(err=>{
        console.log(err)}) 
       }
    }



    return(
        <div className="edit-container">

        <form className='edit-form edit-note-form' onSubmit={onEditHandler} >
            <h2 className='edit-heading'>Редактирай бележка</h2>
            <input className='edit-input'
            type='text'
            name='Title'
            placeholder='New note title'
            defaultValue={note.title}
            onChange={setValues}
              />
               <section className='edit-radio-section'>
                    <article className='edit-radio-holder'>
                         <label htmlFor="image">Прикачи снимка</label>
                         <input
                          type="radio"
                          name="ImageChecked"
                          id="image"
                          onChange={setValues}
                          />
                    </article>
                    <article className='edit-radio-holder'>
                          <label htmlFor="image">Пиши директно</label>
                          <input
                          defaultChecked={true}
                          type="radio"
                          name="ImageChecked"
                          id="text"
                         onChange={setValues}
                />
                    </article>             
                </section>
                {values.ImageChecked?
                      <input
                      className='edit-file edit-input'
                      type="file"
                      name="file"
                      id="file"
                      onChange={setValues}
                      accept="image/png, image/gif, image/jpeg"
                     />
                     :
                     <textarea
                      className='edit-input edit-note-content'
                      type="text"
                      name="Content"
                      id="note-content"
                      placeholder="Съдържание на бележката"
                      onChange={setValues}
                      defaultValue={note.content}
                      />
                }
              <input className='edit-button' type="submit" value="Редактирай" />
        </form>
        </div>

    )
}