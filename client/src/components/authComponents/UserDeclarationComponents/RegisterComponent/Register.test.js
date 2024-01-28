import { render,cleanup,waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { act } from "@testing-library/react";

import * as router from 'react-router'

import * as authService from '../../../../services/authServises'

import { AuthProvider } from "../../../../contexts/AuthContext"
import { BrowserRouter } from "react-router-dom"

import Register from './Register'

const changeAlert=(btn,message)=>{
    window.alert = jest.fn(()=>{
      btn.textContent=message
    });
  }
  
const mockedUsedNavigate = jest.fn();

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate)
  })

describe('Register tests',()=>{
      
  afterEach(cleanup)

    it('Should register user with correct data',async()=>{

        jest.spyOn(authService,'register').mockImplementation(()=>Promise.resolve('Success!'))

        render(
            <BrowserRouter>
               <AuthProvider>
                   <Register/>
               </AuthProvider>
            </BrowserRouter>
        )

        act(()=>{
            let inputFields = document.querySelectorAll('.auth-info-section input')
            userEvent.type(inputFields[0],'Student')
            userEvent.type(inputFields[1],'student@abv.bg')
            userEvent.type(inputFields[2],'12345678')
            userEvent.type(inputFields[3],'12345678')

            let registerBtn = document.querySelector('.submit-auth-button')
            userEvent.click(registerBtn)
        })

        await waitFor(()=>{
               expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome')
        })
        
    })

    it('Should not allow access to website if an error occurs',async()=>{
         
        jest.spyOn(authService,'register').mockImplementation(()=>Promise.resolve(new Error()))

        render(
            <BrowserRouter>
               <AuthProvider>
                  <Register/>
               </AuthProvider>
            </BrowserRouter>
        )

        let registerBtn = document.querySelector('.submit-auth-button')
        changeAlert(registerBtn,'Error');
        userEvent.click(registerBtn);
        
        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
            expect(screen.getByText('Error')).toBeInTheDocument;
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
        
        let registerBtn = document.querySelector('.submit-auth-button')
        changeAlert(registerBtn,'Error');
        userEvent.click(registerBtn);
        
         await waitFor(async()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
            expect( screen.getByText('Error')).toBeInTheDocument;
        })

    })

    it('Register should not work if password and repassword dont match',async()=>{

        render(
            <BrowserRouter>
               <AuthProvider>
                  <Register/>
               </AuthProvider>
            </BrowserRouter>
        )

        act(()=>{
            let inputFields  = document.querySelectorAll('.auth-info-section input');
            userEvent.type(inputFields[0],'Student')
            userEvent.type(inputFields[1],'student@abv.bg')
            userEvent.type(inputFields[2],'1234567')
            userEvent.type(inputFields[3],'12345678')

             let registerBtn = document.querySelector('.submit-auth-button')
             changeAlert(registerBtn,'Error');
             userEvent.click(registerBtn)
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
            expect(screen.findByText('Error')).toBeInTheDocument;
        })

    })
})