import './Login.css'
import studyGirl from '../../../static/img/studyGirl.jpg'

import { useState,useContext } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../../contexts/AuthContext'

import { login } from '../../../services/authServises'



export default function Login(){

  const {loginUser} = useContext(AuthContext);

  const navigate  = useNavigate();

  const [values,setValues] = useState({
    LoginString: '',
    Password: '',
  })

  const onChangeHandler = (e)=>{
      setValues(oldState=>({
        ...oldState,
        [e.target.name]: e.target.value
      }))     
  }

  const onSubmitHandler = (e)=>{
      e.preventDefault();
     login(values).then(user=>{
       loginUser(user);
       navigate('/welcome');
     }).catch(err=>
      alert(err))
  }

  return(
    <div className='login-holder'>
      <img src={studyGirl}/>
       <div className="form-holder">
         <h2 className='login-heading'>Login</h2>
         <form className='login-form' action="" onSubmit={onSubmitHandler}>
            <section className='info-section'>            
                 <input type="text" 
                 name="LoginString" 
                 id="emailOrUsername" 
                 placeholder='Email or Username'
                 onChange={onChangeHandler}
                 />
            </section>
            <section className='info-section'>
                 <input 
                 type="password" 
                 name="Password" 
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