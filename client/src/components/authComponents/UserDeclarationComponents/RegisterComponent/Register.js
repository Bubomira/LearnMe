import '../Auth.css'
import studyRegisterGirl from '../../../../static/img/studyRegisterGirl.jpg'

import { useContext } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { register } from '../../../../services/authServises'

import { AuthContext } from '../../../../contexts/AuthContext'
import useChangeInput from '../../../../hooks/useChangeInput'

export default function Register(){
    const navigate = useNavigate();

    const {loginUser} = useContext(AuthContext)

    const[values,setValues] =useChangeInput({
        username:'',
        password:'',
        email:'',
        rePass:''
    })
    const onSubmitHandler=(e)=>{
         e.preventDefault();
        register(values)
        .then(user=>{
            loginUser(user);
            navigate('/welcome')
        }).catch(err=>{
            alert(err)
        })
    }
  return(
    <div className='auth-holder'>
       <div className="form-holder">
         <h2 className='auth-heading'>Register</h2>
         <form className='auth-form' action="" onSubmit={onSubmitHandler}>
            <section className='auth-info-section'>    
                 <input type="text" 
                 name="Username" 
                 id="username" 
                 placeholder='Username'
                 onChange={setValues}
                 />
            </section>
            <section className='auth-info-section'>    
                 <input type="text" 
                 name="Email" 
                 id="email" 
                 placeholder='Email'
                 onChange={setValues}
                 />
            </section>
            <section className='auth-info-section'>
                 <input 
                 type="Password" 
                 name="password" 
                 id="password"
                  placeholder='Password'
                  onChange={setValues}
                  />
            </section>
            <section className='auth-info-section'>    
                 <input type="text" 
                 name="RePass" 
                 id="re-pass" 
                 placeholder='Repeat Password'
                 onChange={setValues}
                 />
            </section>
           <section className="auth-submit-section">
              <button className='submit-auth-button' type="submit">Register</button>
           </section>
         </form>
         <p className='auth-message'>Already have an account? <Link to='/login'>Login here</Link></p>
      </div>
        <img width='60%' src={studyRegisterGirl}/>
     </div>
    )
}