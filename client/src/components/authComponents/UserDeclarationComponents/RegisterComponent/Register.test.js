import { render,cleanup,waitFor, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event"

import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "../../../../contexts/AuthContext"

import Register from './Register'

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

const mockRegisterFunction = (mockingData)=>{
    jest.mock('../../../../services/authServises',async()=>{
        return{
            register: Promise.resolve(mockingData)
        }
    })
}

describe('Register tests',()=>{

    it('Should register user with correct data',()=>{

        mockRegisterFunction({ Username:'Student', Email:'student@abv.bg', Password:12345678})

        render(
            <BrowserRouter>
                <AuthProvider>
                    <Register/>
                </AuthProvider>
            </BrowserRouter>
        )

        const registerBtn = document.querySelector('.submit-auth-button')
        changeAlert(registerBtn);
        userEvent.click(registerBtn)

        waitFor(()=>{
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome')
        })
        
    })

    it('Should not allow access to website if an error occurs',async()=>{
         
        mockRegisterFunction(new Error('An error has occurred'));
        
        render(
            <BrowserRouter>
               <AuthProvider>
                  <Register/>
               </AuthProvider>
            </BrowserRouter>
        )

        const registerBtn = document.querySelector('.submit-auth-button')
        changeAlert(registerBtn);
        userEvent.click(registerBtn);
        
        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
            expect( screen.getByText('Error')).toBeInTheDocument;
        })
        
    })
    
    it('Register should not work with empty fields',async()=>{

        render(
            <BrowserRouter>
               <AuthProvider>
                  <Register/>
               </AuthProvider>
            </BrowserRouter>
        )
        
        const registerBtn = document.querySelector('.submit-auth-button')
        changeAlert(registerBtn);
        userEvent.click(registerBtn);
        
         await waitFor(async()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
            expect( screen.getByText('Error')).toBeInTheDocument;
        })

    })
})