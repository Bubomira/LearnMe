
import notes from '../../../../../static/img/notes.jpg'


import useChangeInput from "../../../../../hooks/useChangeInput"

export default function CreateNote(){

    const [values,setValues] =useChangeInput({
        Title:'',
        Tags:'',
        ImageChecked:false
    });
    return(
        <div className="create-wrapper">
        <img width='50%' src={notes} alt="decks" />
        <section className="create-form-holder">
            <h2>Create Note</h2>
            <form className="create-form" >
              <input
              className='create-input'
                 type="text"
                 name="Title"
                 id="title"
                 placeholder="Note Title"
                 onChange={setValues}
                />
                <input
                className='create-tags create-input'
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
                          className=' '
                          type="radio"
                          name="imageOrTextbox"
                          id="image"
                          onChange={setValues}
                          />
                    </article>
                    <article className='radio-holder'>
                          <label htmlFor="image">Type content directly</label>
                          <input
                          className=''
                          type="radio"
                          name="imageOrTextbox"
                          id="text"
                         onChange={setValues}
                />
                    </article>             
                </section>
                {!values.ImageChecked?
                      <input
                      className='create-tags create-input'
                      type="file"
                      name="file"
                      id="file"
                      onChange={setValues}
                      accept="image/png, image/gif, image/jpeg"
                     />
                     :
                     <textarea
                      className='create-tags create-input'
                      type="text"
                      name="Tags"
                      id="tags"
                      placeholder="The content of your note"
                      onChange={setValues}
                      />
                }
                <button className='creates-btn' type="submit">Submit</button>
            </form>
        </section>
       </div>
     )
}