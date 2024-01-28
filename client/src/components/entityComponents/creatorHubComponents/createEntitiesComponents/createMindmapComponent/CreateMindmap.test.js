import { render,cleanup,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import * as router from 'react-router'

import { BrowserRouter } from "react-router-dom";
import CreateMindmap from "./CreateMindmap";

import * as mindmapServices from '../../../../../services/entityService/mindmapService/mindmapServices'

const mockedUsedNavigate = jest.fn();

afterEach(cleanup)

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate)
  
  jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

describe('Create mindmap form tests',()=>{
    it('Form should redirect upon successful creation',async()=>{

        jest.spyOn(mindmapServices,'createMindmap').mockImplementation(()=>Promise.resolve({id:1}))

        render(
            <BrowserRouter> 
                <CreateMindmap/>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('.create-input')
        const createDeckBtn = document.querySelector('.creates-btn')

        act(()=>{
            userEvent.type(inputs[0],'My mindmap')
            userEvent.type(inputs[1],'tag1, tag2')
            userEvent.click(createDeckBtn)
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/mindmap/1')
        })  
    })

    it('Form should not work if an error occurs',async()=>{

        jest.spyOn(mindmapServices,'createMindmap').mockImplementation(()=>Promise.resolve(new Error('Ops')))

        render(
            <BrowserRouter> 
               <CreateMindmap/>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('.create-input')
        const createDeckBtn = document.querySelector('.creates-btn')
  
        act(()=>{
            userEvent.type(inputs[0],'My mindmap')
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
               <CreateMindmap/>
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