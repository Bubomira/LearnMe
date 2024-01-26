import {render, cleanup,waitFor, screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import { BrowserRouter } from "react-router-dom"

import Login from "./Login"
import { AuthProvider } from "../../../../contexts/AuthContext"

const changeAlert=(btn)=>{
  window.alert = jest.fn(()=>{
     btn.textContent='Error'
  });
}


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup)

const mockLoginFunction = (mockingData)=>{
  jest.mock('../../../../services/authServises',async()=>{       
    return{
       login: Promise.resolve(mockingData)
      }
 })
}

describe('Login tests',()=>{
    
    it('Should login user with correct username and password',async()=>{

      mockLoginFunction({ Username:'Student', Password:12345678})

        render(<BrowserRouter>
                <AuthProvider>
                     <Login/>
               </AuthProvider>
            </BrowserRouter> )
        
         const loginButton = document.querySelector('.submit-auth-button')
         userEvent.click(loginButton);
         
         waitFor(()=>{
           expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome')
          })  
    })
    it('Should not login user when the server trows an error',async()=>{
      
        mockLoginFunction(new Error('Trouble login in'))

         render(<BrowserRouter>
            <AuthProvider>
                 <Login/>
           </AuthProvider>
        </BrowserRouter> )

           const loginButton = document.querySelector('.submit-auth-button')
           changeAlert(loginButton)
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
      changeAlert(loginButton)
      userEvent.click(loginButton);

    waitFor(async()=>{
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
        expect(await screen.findByText('Error')).toBeInTheDocument
    })  
})
         
})