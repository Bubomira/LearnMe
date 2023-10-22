import './Login.css'
import studyGirl from '../../../static/img/studyGirl.jpg'

import { useState } from 'react'

import { Link } from 'react-router-dom'

export default function Login(){

  const [values,setValues] = useState({
    emailOrUsername: '',
    password: '',
  })

  const onChangeHandler = (e)=>{
      setValues(oldState=>({
        ...oldState,
        [e.target.name]: e.target.value
      }))     
  }



  return(
    <div className='login-holder'>
      <img src={studyGirl}/>
       <div className="form-holder">
         <h2 className='login-heading'>Login</h2>
         <form className='login-form' action="">
            <section className='info-section'>            
                 <input type="text" 
                 name="emailOrUsername" 
                 id="emailOrUsername" 
                 placeholder='Email or Username'
                 onChange={onChangeHandler}
                 />
            </section>
            <section className='info-section'>
                 <input 
                 type="password" 
                 name="password" 
                 id="password"
                  placeholder='Password'
                  onChange={onChangeHandler}
                  />
            </section>
           <section className="submit-section">
              <button className='submit-login-button' type="submit">Login</button>
           </section>
         </form>
         <p className='register-message'>Do not have an account? <Link to='/register'>Register here</Link></p>
      </div>
     </div>
    )
}