import '../Create.css'

import useChangeInput from '../../../../../hooks/useChangeInput'

export default function CreateTag({attachTagHandler}){

    const [values,setValues] = useChangeInput({
        tagName:''
    })

    return(
        <section className='create-wrapper create-tags'>
        <section className="create-form-holder">
        <h2>Attach Tag</h2>
        <form className="create-form" onSubmit={(e)=>attachTagHandler(e,values.tagName)}>
          <input 
          type="text" 
          className='create-input' 
          placeholder='Tag name'
          onChange={setValues}
          name='tagName'
          />
          <input
           type="submit"
           className='creates-btn'          
            />
        </form>
        </section>
        </section>
    )
}