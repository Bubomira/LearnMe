import { render,waitFor,cleanup,act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as noteService from '../../../../../services/entityService/noteService/noteService'
import * as router from 'react-router'

import { BrowserRouter } from "react-router-dom";
import CreateNote from "./CreateNote";

afterEach(cleanup)

const mockedUsedNavigate = jest.fn();

beforeEach(()=>{
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate)
    jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

describe(('Create note tests'),()=>{
    
    it('Form should work correctly when content is submitted with text area',async()=>{

        jest.spyOn(noteService,'createNote').mockImplementation(()=>Promise.resolve('Success!'))

        render(
            <BrowserRouter>
                <CreateNote/>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('input')

        act(()=>{
            userEvent.click(inputs[3]);
            userEvent.type(inputs[0],'Note');
            userEvent.type(inputs[1],'Tag1, Tag2')
        })

        const textArea = document.querySelector('textarea');
        const createNoteBtn = document.querySelector('.creates-btn')

        act(()=>{
            userEvent.type(textArea,'Note content')
            userEvent.click(createNoteBtn);
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/owned/notes')
        })
    })

    it('Form should work correctly when is submitted via an image',async()=>{
        
        jest.spyOn(noteService,'createNote').mockImplementation(()=>Promise.resolve('Success!'))

        render(
            <BrowserRouter>
                <CreateNote/>
            </BrowserRouter>
        )

        const file = new File(['hello'],'hello.png', {type: 'image/png'})

        global.URL.createObjectURL = jest.fn()

        const inputs = document.querySelectorAll('input');
        const createNoteBtn = document.querySelector('.creates-btn')

        act(()=>{
            userEvent.type(inputs[0],'My note');
            userEvent.type(inputs[1],'Tag1, Tag2')
            userEvent.upload(inputs[4],file)
            userEvent.click(createNoteBtn)
        })

        await waitFor(()=>{
            expect(inputs[4].files).toHaveLength(1)
        })
    })
    it('Form should not redirect when an error has occurred',async()=>{

        jest.spyOn(noteService,'createNote').mockImplementation(()=>Promise.resolve(new Error()))

        render(
            <BrowserRouter>
                <CreateNote/>
            </BrowserRouter>
        )

        const inputs = document.querySelectorAll('input')

        act(()=>{
            userEvent.click(inputs[3]);
            userEvent.type(inputs[0],'Note');
            userEvent.type(inputs[1],'Tag1, Tag2')
        })

        const textArea = document.querySelector('textarea');
        const createNoteBtn = document.querySelector('.creates-btn')

        act(()=>{
            userEvent.type(textArea,'Note content')
            userEvent.click(createNoteBtn);
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
        })
    })

    it('Form should not be called when is empty',async()=>{     
        render(
            <BrowserRouter>
                <CreateNote/>
            </BrowserRouter>
        )

        const createNoteBtn = document.querySelector('.creates-btn')

        act(()=>{
            userEvent.click(createNoteBtn);
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).not.toHaveBeenCalled();
        })
    })
})