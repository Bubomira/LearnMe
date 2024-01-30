import { waitFor,cleanup,render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import  '@testing-library/jest-dom'

import * as router from 'react-router'
import * as noteService from '../../../../services/entityService/noteService/noteService'

import { BrowserRouter } from "react-router-dom";
import {  NoteProvider } from "../../../../contexts/entityContexts/NoteContext";

import EditNote from "./EditNote";

const mockedUseNavigate = jest.fn()

beforeEach(()=>{
    jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUseNavigate);
    jest.spyOn(router,'useParams').mockImplementation(()=>jest.fn().mockReturnValue({noteId:1}))
    jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

afterEach(cleanup)

describe('Edit note tests',()=>{
    it('Should render correct note information',async()=>{
        jest.spyOn(noteService,'getNoteDetails').mockImplementation(()=>Promise.resolve({id:1,title:'My old note', content:'This'}))

        render(
            <BrowserRouter>
                <NoteProvider>
                     <EditNote/>
                </NoteProvider>
            </BrowserRouter>
        )

       let titleInput  = document.querySelector('input');
       let textArea = document.querySelector('textarea')

       await waitFor(()=>{
          expect(titleInput).toHaveValue('My old note')
          expect(textArea).toHaveValue('This')
       })
    })

    it('Should redirect to details page when everything is alright',async()=>{
        jest.spyOn(noteService,'getNoteDetails').mockImplementation(()=>Promise.resolve({id:1,title:'My old note', content:'This'}))
        jest.spyOn(noteService,'updateNote').mockImplementation(()=>Promise.resolve())

         render(
            <BrowserRouter>
                <NoteProvider>
                     <EditNote/>
                </NoteProvider>
            </BrowserRouter>
        )

        const editBtn = document.querySelector('.edit-button');

        act(()=>{
            userEvent.click(editBtn);
        })

        await waitFor(()=>{
            expect(mockedUseNavigate).toHaveBeenCalled;
        })
    })

    it('Should not redirect when there has been an error',async()=>{
        jest.spyOn(noteService,'getNoteDetails').mockImplementation(()=>Promise.resolve({id:1,title:'My old note', content:'This'}))
        jest.spyOn(noteService,'updateNote').mockImplementation(()=>Promise.resolve(new Error()));

        render(
            <BrowserRouter>
                <NoteProvider>
                     <EditNote/>
                </NoteProvider>
            </BrowserRouter>
        )
    
            const editBtn = document.querySelector('.edit-button');
    
            act(()=>{
                userEvent.click(editBtn);
            })

            await waitFor(()=>{
                expect(mockedUseNavigate).not.toHaveBeenCalled;
            })
    })

    it('Form should not work with empty fields',async()=>{
        jest.spyOn(noteService,'getNoteDetails').mockImplementation(()=>Promise.resolve({id:1,title:'My old note', content:'This'}))

        render(
            <BrowserRouter>
                <NoteProvider>
                     <EditNote/>
                </NoteProvider>
            </BrowserRouter>
        )

        const editBtn = document.querySelector('.edit-button')
        const input =document.querySelector('input')
        const textArea = document.querySelector('textarea')

        act(()=>{
              userEvent.click(editBtn);
              userEvent.clear(input)
              userEvent.clear(textArea)
        })

        await waitFor(()=>{
            expect(mockedUseNavigate).not.toHaveBeenCalled;
        })
    })
})
