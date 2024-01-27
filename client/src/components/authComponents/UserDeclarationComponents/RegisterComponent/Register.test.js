import { render,cleanup,waitFor, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event"

import { changeAlert,serviceMockingFunction,navigationMock,navigationMockingFunction } from "../../../../utils/testHelper"

import { AuthProvider } from "../../../../contexts/AuthContext"

import { BrowserRouter } from "react-router-dom"

import Register from './Register'


navigationMockingFunction()

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

    serviceMockingFunction('../services/authServises','register',{ Username:'Student', Email:'student@abv.bg', Password:12345678})

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
            expect(navigationMock).toHaveBeenCalledWith('/welcome')
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
        changeAlert(registerBtn,'Error');
        userEvent.click(registerBtn);
        
        await waitFor(()=>{
            expect(navigationMock).not.toHaveBeenCalled();
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
        changeAlert(registerBtn,'Error');
        userEvent.click(registerBtn);
        
         await waitFor(async()=>{
            expect(navigationMock).not.toHaveBeenCalled();
            expect( screen.getByText('Error')).toBeInTheDocument;
        })

    })
})