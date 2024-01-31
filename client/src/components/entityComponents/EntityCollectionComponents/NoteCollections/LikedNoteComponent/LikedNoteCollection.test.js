import { cleanup,render,waitFor,screen } from "@testing-library/react";

import * as noteService from '../../../../../services/entityService/noteService/noteUserService'

import { BrowserRouter } from "react-router-dom";
import LikedNotesColection from './LikedNotesCollection'

jest.mock('../../../../../hooks/useLoader',()=>{
    return{
        __esModule:true,
        default:()=>[true,jest.fn()]
    }
})
const likedNotes =[
    {id:1,title:'Note 1'},
    {id:2,title:'Note 2'},
    {id:3,title:'Note 3'}
]

afterEach(cleanup)

describe('Liked Note Collection tests',()=>{
    it('Should render correct information when there are notes present',async()=>{
        jest.spyOn(noteService,'getLikedNotes').mockImplementation(()=>Promise.resolve(likedNotes))

        render(
            <BrowserRouter>
               <LikedNotesColection/>
            </BrowserRouter>
        )

        const notesCards  = document.getElementsByClassName('note-preview-wrapper')

        await waitFor(()=>{
            expect(screen.getByText('Това са харесаните ви бележки!')).toBeInTheDocument;
            expect(notesCards).toHaveLength(3);
            expect(screen.getByText('Note 1')).toBeInTheDocument
            expect(screen.getByText('Note 2')).toBeInTheDocument
            expect(screen.getByText('Note 3')).toBeInTheDocument
        })
    })

    it('Should display proper message when there are not any liked notes',async()=>{
        jest.spyOn(noteService,'getLikedNotes').mockImplementation(()=>Promise.resolve())

        render(
            <BrowserRouter>
               <LikedNotesColection/>
            </BrowserRouter>
        )

        const notesCards  = document.getElementsByClassName('note-preview-wrapper')

        await waitFor(()=>{
            expect(screen.getByText('Няма резултати')).toBeInTheDocument
            expect(notesCards).toHaveLength(0)
        })
    })
})
