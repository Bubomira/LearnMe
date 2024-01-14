import './NotFound.css'

import error from '../../static/img/error.jpg'

export default function NotFound(){

    return(
    <section className="not-found-section">
        <img className='error-img' src={error} alt="" />
        <section className='error-section'>
           <h2>Опа...</h2>
           <h4>Не успяхме да намерим това, което търсите</h4>
         </section>
    </section>
    )
}