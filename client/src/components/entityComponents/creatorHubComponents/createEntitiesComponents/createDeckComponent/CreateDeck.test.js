import { screen,render,cleanup,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import * as router from 'react-router'

import { BrowserRouter } from "react-router-dom";
import CreateDeck from "./CreateDeck";

import * as deckService from '../../../../../services/entityService/deckService/deckServices'

const mockedUsedNavigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate)
  
  jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

describe('Create deck form tests',()=>{
    it('Form should redirect upon successful creation',async()=>{

        jest.spyOn(deckService,'createDeck').mockImplementation(()=>Promise.resolve({id:1}))

        render(
            <BrowserRouter> 
                <CreateDeck/>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('.create-input')
        const createDeckBtn = document.querySelector('.creates-btn')

        act(()=>{
            userEvent.type(inputs[0],'My deck')
            userEvent.type(inputs[1],'Special, ok')
            userEvent.click(createDeckBtn)
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/deck/1')
        })  
    })

    it('Form should not work if an error occurs',async()=>{

        jest.spyOn(deckService,'createDeck').mockImplementation(()=>Promise.resolve(new Error('Ops')))

        render(
            <BrowserRouter> 
               <CreateDeck/>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('.create-input')
        const createDeckBtn = document.querySelector('.creates-btn')
  
        act(()=>{
            userEvent.type(inputs[0],'My deck')
            userEvent.type(inputs[1],'tag, tag2')
            userEvent.click(createDeckBtn);
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
        })
    })

    it('Should not work with empty fields',async()=>{

        render(
            <BrowserRouter> 
               <CreateDeck/>
            </BrowserRouter>
        )

        const createDeckBtn = document.querySelector('.creates-btn');

        act(()=>{
            userEvent.click(createDeckBtn);
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
        })

    })
})