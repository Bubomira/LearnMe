import { render,cleanup,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import * as router from 'react-router'

import { DeckContext } from "../../../../../contexts/entityContexts/DeckContext";
import { BrowserRouter } from "react-router-dom";

import CreateFlashcard from "./createFlashcard";

import * as flashcardService from "../../../../../services/entityService/flashcardServices";

const mockedUsedNavigate = jest.fn();

afterEach(cleanup)

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate)
  
  jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

describe('Create flashcard form tests',()=>{
    it('Form should redirect upon successful creation',async()=>{

        jest.spyOn(flashcardService,'addFlashcard').mockImplementation(()=>Promise.resolve({id:1}))

        render(
            <BrowserRouter> 
                <DeckContext.Provider value={{deck:{id:1}}}>
                    <CreateFlashcard/>
                </DeckContext.Provider>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('.create-input')
        const createFlashcardBtn = document.querySelector('.creates-btn')

        act(()=>{
            userEvent.type(inputs[0],'My flashcard')
            userEvent.type(inputs[1],'this')
            userEvent.click(createFlashcardBtn)
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/deck/1')
        })  
    })

    it('Form should not work if an error occurs',async()=>{

        jest.spyOn(flashcardService,'addFlashcard').mockImplementation(()=>Promise.resolve({id:1}))

        render(
            <BrowserRouter> 
                <DeckContext.Provider value={{deck:{id:1}}}>
                    <CreateFlashcard/>
                </DeckContext.Provider>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('.create-input')
        const createFlashcardBtn = document.querySelector('.creates-btn')
  
        act(()=>{
            userEvent.type(inputs[0],'My flashcard')
            userEvent.type(inputs[1],'this')
            userEvent.click(createFlashcardBtn);
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
        })
    })

    it('Should not work with empty fields',async()=>{

        render(
            <BrowserRouter> 
               <DeckContext.Provider value={{deck:{id:1}}}>
                   <CreateFlashcard/>
               </DeckContext.Provider>
            </BrowserRouter>       
        )

        const createFlashcardBtn = document.querySelector('.creates-btn');

        act(()=>{
            userEvent.click(createFlashcardBtn);
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
        })

    })
})