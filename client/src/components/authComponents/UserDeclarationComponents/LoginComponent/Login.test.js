import {render, cleanup,waitFor, screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import { changeAlert,serviceMockingFunction,navigationMock,navigationMockingFunction } from "../../../../utils/testHelper"

import { AuthProvider } from "../../../../contexts/AuthContext"

import { BrowserRouter } from "react-router-dom"

import Login from "./Login"

navigationMockingFunction()

afterEach(cleanup)

describe('Login tests',()=>{
    
    it('Should login user with correct username and password',async()=>{

      serviceMockingFunction('../services/authServises','login',{ Username:'Student', Password:12345678})
        render(<BrowserRouter>
                <AuthProvider>
                     <Login/>
               </AuthProvider>
            </BrowserRouter> )
        
         const loginButton = document.querySelector('.submit-auth-button')
         userEvent.click(loginButton);
         
         waitFor(()=>{
           expect(navigationMock).toHaveBeenCalledWith('/welcome')
          })  
    })
    it('Should not login user when the server trows an error',async()=>{
      
      serviceMockingFunction('../services/authServises','login',new Error('Trouble loging in'))

         render(<BrowserRouter>
            <AuthProvider>
                 <Login/>
           </AuthProvider>
        </BrowserRouter> )

           const loginButton = document.querySelector('.submit-auth-button')
           changeAlert(loginButton,'Error')
           userEvent.click(loginButton);

     await waitFor(()=>{
         expect(screen.getByText('Error')).toBeInTheDocument
      })

})

    it('Login form should not working with empty fields',()=>{

        render(<BrowserRouter>
            <AuthProvider>
                 <Login/>
           </AuthProvider>
        </BrowserRouter> )

      const loginButton = document.querySelector('.submit-auth-button')
      changeAlert(loginButton,'Error')
      userEvent.click(loginButton);

    waitFor(async()=>{
        expect(navigationMock).not.toHaveBeenCalled();
        expect(await screen.findByText('Error')).toBeInTheDocument
    })  
})
         
})