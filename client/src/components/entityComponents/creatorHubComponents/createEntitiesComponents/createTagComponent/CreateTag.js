import '../Create.css'

import useChangeInput from '../../../../../hooks/useChangeInput'

export default function CreateTag({attachTagHandler}){

    const [values,setValues] = useChangeInput({
        tagName:''
    })

    return(
        <section className="site-wrapper">
        <section className='create-wrapper create-tags'>
        <section className="create-form-holder">
        <h2>Закачи таг</h2>
        <form  className="create-form create-tag-form" onSubmit={(e)=>attachTagHandler(e,values.tagName)}>
          <input 
          type="text" 
          className='create-input' 
          placeholder='Име'
          onChange={setValues}
          name='tagName'
          />
          <button
           type="submit"
           className='creates-btn'>Закачи
           </button>
        </form>
        </section>
        </section>
    </section>
    )
}