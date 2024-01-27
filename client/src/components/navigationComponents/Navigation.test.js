import { cleanup,render, screen, waitFor} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import Navigation from "./Navigation";

afterEach(cleanup)


describe('Navigation tests',()=>{
    it('Should display guest navigation for guests',async()=>{

        render(
            <BrowserRouter>
                <AuthContext.Provider value={{user:{}}}>
                    <Navigation/>
                </AuthContext.Provider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.findByText('Регистрация')).toBeInTheDocument;
        })
    })
    it('Should display user navigation when a user is logged in',async()=>{
        render(
             <BrowserRouter>
                <AuthContext.Provider value={{user:{token:'Bearer token'}}}>
                    <Navigation/>
                </AuthContext.Provider>
             </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.findAllByText('Създай')).toBeInTheDocument;
        })
    })
})