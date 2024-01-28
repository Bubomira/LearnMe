import { cleanup,waitFor,render } from "@testing-library/react";

import * as authService from '../../../services/authServises'
import * as router from 'react-router'

import { BrowserRouter } from "react-router-dom";
import Logout from "./Logout";
import { AuthProvider } from "../../../contexts/AuthContext";

afterEach(cleanup)

const mockedUseNavigate = jest.fn()

beforeEach(()=>{
    jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUseNavigate)
})

describe('Logout test',()=>{
    it('Logout should work correctly',async()=>{
        
        jest.spyOn(authService,'logout').mockImplementation(()=>Promise.resolve('Success'))

        render(
            <BrowserRouter>
               <AuthProvider>
                  <Logout/>
               </AuthProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(mockedUseNavigate).toHaveBeenCalledWith('/')
        })
    })

    it('Logout should not redirect if an error occurs',async()=>{
        
        jest.spyOn(authService,'logout').mockImplementation(()=>Promise.resolve(new Error()))

        render(
            <BrowserRouter>
               <AuthProvider>
                  <Logout/>
               </AuthProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(mockedUseNavigate).not.toHaveBeenCalled();
        })
    })
})