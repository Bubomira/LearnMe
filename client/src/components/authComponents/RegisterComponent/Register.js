import './Register.css'
import { Link } from 'react-router-dom'
import studyGirl from '../../../static/img/studyGirl.jpg'

export default function Login(){

  return(
    <div className='register-holder'>
      <img src={studyGirl}/>
       <div className="register-holder">
         <h2 className='register-heading'>Register</h2>
         <form className='register-form' action="">
            <section className='register-info-section'>    
                 <input type="text" 
                 name="email" 
                 id="email" 
                 placeholder='Email'
                 />
            </section>
            <section className='register-info-section'>
                 <input 
                 type="password" 
                 name="password" 
                 id="password"
                  placeholder='Password'
                  />
            </section>
           <section className="register-submit-section">
              <button className='register-login-button' type="submit">Register</button>
           </section>
         </form>
         <p className='login-message'>Already have an account? <Link to='login'>Login here</Link></p>
      </div>
     </div>
    )
}