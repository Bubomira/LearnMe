import '../Auth.css'
import studyRegisterGirl from '../../../../static/img/studyRegisterGirl.jpg'

import { useContext } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { register } from '../../../../services/authServises'

import { AuthContext } from '../../../../contexts/AuthContext'
import useChangeInput from '../../../../hooks/useChangeInput'

import checkIfFormDataIsInvalid from '../../../../utils/emtyFormChecker'

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
         if(!checkIfFormDataIsInvalid(values)){
            alert('Моля, попълнете всички полета')
         }else{
            if(values.rePass!=values.password){
              alert('Паролите се раличават!')
            }else{
              register(values)
              .then(user=>{
                  loginUser(user);
                  navigate('/welcome')
              }).catch(err=>{
                  alert('Възникна грешка, моля опитайте отново')
              })
            }
         }
    }
  return(
    <div className='auth-holder'>
       <div className="form-holder">
         <h2 className='auth-heading'>Регистрирай се!</h2>
         <form className='auth-form' action="" onSubmit={onSubmitHandler}>
            <section className='auth-info-section'>    
                 <input type="text" 
                 name="username" 
                 id="username" 
                 placeholder='Потребителско име'
                 onChange={setValues}
                 />
            </section>
            <section className='auth-info-section'>    
                 <input type="text" 
                 name="email" 
                 id="email" 
                 placeholder='Имейл'
                 onChange={setValues}
                 />
            </section>
            <section className='auth-info-section'>
                 <input 
                 type="Password" 
                 name="password" 
                 id="password"
                  placeholder='Парола'
                  onChange={setValues}
                  />
            </section>
            <section className='auth-info-section'>    
                 <input type="password" 
                 name="rePass" 
                 id="re-pass" 
                 placeholder='Повтори паролата'
                 onChange={setValues}
                 />
            </section>
           <section className="auth-submit-section">
              <button className='submit-auth-button' type="submit">Регистрация</button>
           </section>
         </form>
         <p className='auth-message'>Вече имаш акаунт? <Link to='/login'>Влез оттук!</Link></p>
      </div>
        <img width='60%' src={studyRegisterGirl}/>
     </div>
    )
}