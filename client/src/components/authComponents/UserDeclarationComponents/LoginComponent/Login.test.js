import {render, cleanup,waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "@testing-library/react"

import * as router from 'react-router'
import * as authService from '../../../../services/authServises'

import { AuthProvider } from "../../../../contexts/AuthContext"

import { BrowserRouter } from "react-router-dom"

import Login from "./Login"

const changeAlert=(btn,message)=>{
  window.alert = jest.fn(()=>{
    btn.textContent=message
  });
}

const mockedUsedNavigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate)
})

describe('Login tests',()=>{
  
  afterEach(cleanup)

    it('Should login user with correct username and password',async()=>{

      jest.spyOn(authService,'login').mockImplementation(()=>Promise.resolve({ Username:'Student', Password:12345678}))
      
        render(<BrowserRouter>
                <AuthProvider>
                     <Login/>
               </AuthProvider>
            </BrowserRouter> )

          act(()=>{
            let inputFields  = document.querySelectorAll('.auth-info-section input');
            userEvent.type(inputFields[0],'Student')
            userEvent.type(inputFields[1],'12345678')
            
             let loginButton = document.querySelector('.submit-auth-button')
             userEvent.click(loginButton);
          })

         
        await waitFor(()=>{
           expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome')
          })  
    })
    it('Should not login user when the server trows an error',async()=>{
      
      jest.spyOn(authService,'login').mockImplementation(()=>Promise.resolve(new Error()))

         render(<BrowserRouter>
            <AuthProvider>
                 <Login/>
           </AuthProvider>
        </BrowserRouter> )

           let loginButton = document.querySelector('.submit-auth-button')
           changeAlert(loginButton,'Error')
           userEvent.click(loginButton);

     await waitFor(()=>{
         expect(screen.getByText('Error')).toBeInTheDocument
      })

})
    it('Login form should not working with empty fields',async()=>{

        render(<BrowserRouter>
            <AuthProvider>
                 <Login/>
           </AuthProvider>
        </BrowserRouter> )

      let loginButton = document.querySelector('.submit-auth-button')
      changeAlert(loginButton,'Error')
      userEvent.click(loginButton);

   await waitFor(async()=>{
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
        expect(await screen.findByText('Error')).toBeInTheDocument
    })  
})
         
})