import '../Auth.css'
import studyGirl from '../../../../static/img/studyGirl.jpg'

import { useContext } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../../../contexts/AuthContext'

import { login } from '../../../../services/authServises'

import useChangeInput from '../../../../hooks/useChangeInput'



export default function Login(){

  const {loginUser} = useContext(AuthContext);

  const navigate  = useNavigate();

  const [values,setValues] = useChangeInput({
    LoginString: '',
    Password: '',
  })

  const onSubmitHandler = (e)=>{
      e.preventDefault();
     login(values).then(user=>{
       loginUser(user);
       navigate('/welcome');
     }).catch(err=>
      alert(err))
  }

  return(
    <div className='auth-holder'>
      <img src={studyGirl}/>
       <div className="auth-form-holder">
         <h2 className='auth-heading'>Влез в <br /> профила си</h2>
         <form className='auth-form' action="" onSubmit={onSubmitHandler}>
            <section className='auth-info-section'>            
                 <input type="text" 
                 name="LoginString" 
                 id="emailOrUsername" 
                 placeholder='Имейл или потребителско име'
                 onChange={setValues}
                 />
            </section>
            <section className='auth-info-section'>
                 <input 
                 type="password" 
                 name="Password" 
                 id="password"
                  placeholder='Парола'
                  onChange={setValues}
                  />
            </section>
           <section className="auth-submit-section">
              <button className='submit-auth-button' type="submit">Вход</button>
           </section>
         </form>
         <p className='auth-message'>Нямаш акаунт? <Link to='/register'>Регистрирай се тук!</Link></p>
      </div>
     </div>
    )
}