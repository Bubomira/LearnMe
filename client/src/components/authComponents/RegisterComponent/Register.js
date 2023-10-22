import './Register.css'
import { Link } from 'react-router-dom'
import studyRegisterGirl from '../../../static/img/studyRegisterGirl.jpg'
import { useState } from 'react'

export default function Register(){

    const[values,setValues] =useState({
        username:'',
        password:'',
        email:'',
        rePass:''
    })

    const onChangeHandler =(e)=>{
        setValues((oldState)=>({
            ...oldState,
           [e.target.name]:e.target.value
        }))
    }
    
  return(
    <div className='register-holder'>
       <div className="form-holder">
         <h2 className='register-heading'>Register</h2>
         <form className='register-form' action="">
            <section className='register-info-section'>    
                 <input type="text" 
                 name="username" 
                 id="username" 
                 placeholder='Username'
                 onChange={onChangeHandler}
                 />
            </section>
            <section className='register-info-section'>    
                 <input type="text" 
                 name="email" 
                 id="email" 
                 placeholder='Email'
                 onChange={onChangeHandler}
                 />
            </section>
            <section className='register-info-section'>
                 <input 
                 type="password" 
                 name="password" 
                 id="password"
                  placeholder='Password'
                  onChange={onChangeHandler}
                  />
            </section>
            <section className='register-info-section'>    
                 <input type="text" 
                 name="rePass" 
                 id="re-pass" 
                 placeholder='Repeat Password'
                 onChange={onChangeHandler}
                 />
            </section>
           <section className="register-submit-section">
              <button className='submit-register-button' type="submit">Register</button>
           </section>
         </form>
         <p className='login-message'>Already have an account? <Link to='/login'>Login here</Link></p>
      </div>
        <img src={studyRegisterGirl}/>
     </div>
    )
}