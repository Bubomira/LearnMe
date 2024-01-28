import { render,screen,cleanup,waitFor } from "@testing-library/react";

import '@testing-library/jest-dom'

import * as note from '../../../../services/entityService/noteService/noteService'

import { NoteProvider } from "../../../../contexts/entityContexts/NoteContext";

import { BrowserRouter } from "react-router-dom";

import NoteDetails from "./NoteDetails";

afterEach(cleanup)

jest.mock('../../../../hooks/useLoader',()=>{
        return{
            __esModule: true,
            default:()=>[true,jest.fn()]
        }
 })

describe('Note details tests',()=>{
    it('Should render correct note information',async()=>{

        jest.spyOn(note,'getNoteDetails').mockImplementation(()=>Promise.resolve({
            id:1,
            title: 'My special note',
            content: 'This is a special note',
            ownerId :1,
            isOwnedByUser:true,
            isLikedByUser:false,
            tags:[{id:1,Name:'special'},{id:2,Name:'note'}]
        }))


        render(
            <BrowserRouter>
               <NoteProvider>
                   <NoteDetails/>
               </NoteProvider>
            </BrowserRouter>
        )


        await waitFor(()=>{
            expect(screen.getByText('My special note')).toBeInTheDocument;
            expect(screen.getByText('This is a special note')).toBeInTheDocument;
        })

    })

    it('Should display owner buttons if user is owner',async()=>{

        jest.spyOn(note,'getNoteDetails').mockImplementation(()=>Promise.resolve({
            id:1,
            isOwnedByUser:true,
            isLikedByUser:false,
        }))

        render(
            <BrowserRouter>
               <NoteProvider>
                   <NoteDetails/>
               </NoteProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.getAllByRole('link')[0]).toHaveAttribute('href','/update/note/1')
        })

    })

    it('Should display like buttons if user is not owner ',async()=>{
        jest.spyOn(note,'getNoteDetails').mockImplementation(()=>Promise.resolve({
            isOwnedByUser:false,
            isLikedByUser:true,
        }))

        render(
            <BrowserRouter>
               <NoteProvider>
                   <NoteDetails/>
               </NoteProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            const element = document.querySelector('button svg')
            expect(element).toHaveAttribute('class','svg-inline--fa fa-thumbs-up ')
        })

    })

    it('Should disable dislike button if note is not liked by user',async()=>{

          jest.spyOn(note,'getNoteDetails').mockImplementation(()=>
            Promise.resolve({ 
                isOwnedByUser:false,
                isLikedByUser:false
            }))

          render(
            <BrowserRouter>
               <NoteProvider>
                   <NoteDetails/>
               </NoteProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            const element = document.querySelectorAll('button')[1];
            expect(element).toBeDisabled;
        })
    })

    it('Should disable like button if user has liked the note',async()=>{
        jest.spyOn(note,'getNoteDetails').mockImplementation(()=>
        Promise.resolve({
            isOwnedByUser:false,
            isLikedByUser:true
        }))

        render(
            <BrowserRouter>
               <NoteProvider>
                   <NoteDetails/>
               </NoteProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            const element = document.querySelectorAll('button')[1];
            expect(element).toBeDisabled;
        })
    })
})

