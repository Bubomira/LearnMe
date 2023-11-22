import './NotFound.css'

import error from '../../static/img/error.jpg'

export default function NotFound(){

    return(
    <section className="not-found-section">
        <img src={error} alt="" />
        <section className='error-section'>
           <h2>Ooops...</h2>
           <h4>We could not find what you were looking for.</h4>
         </section>
    </section>
    )
}