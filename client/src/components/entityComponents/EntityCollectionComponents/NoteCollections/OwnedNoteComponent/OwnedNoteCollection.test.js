import { cleanup,render,waitFor,screen } from "@testing-library/react";

import * as noteService from '../../../../../services/entityService/noteService/noteUserService'

import { BrowserRouter } from "react-router-dom";
import OwnedNotesCollection from './OwnedNoteCollection'

jest.mock('../../../../../hooks/useLoader',()=>{
    return{
        __esModule:true,
        default:()=>[true,jest.fn()]
    }
})
const ownedNotes =[
    {id:1,title:'Note 1'},
    {id:2,title:'Note 2'},
    {id:3,title:'Note 3'}
]

afterEach(cleanup)

describe('Owned Notes Collection tests',()=>{
    it('Should render correct information when there are notes present',async()=>{
        jest.spyOn(noteService,'getOwnedNotes').mockImplementation(()=>Promise.resolve(ownedNotes))

        render(
            <BrowserRouter>
               <OwnedNotesCollection/>
            </BrowserRouter>
        )

        const notesCards  = document.getElementsByClassName('note-preview-wrapper')

        await waitFor(()=>{
            expect(screen.getByText('Това са създадените от Вас бележки!')).toBeInTheDocument;
            expect(notesCards).toHaveLength(3);
            expect(screen.getByText('Note 1')).toBeInTheDocument
            expect(screen.getByText('Note 2')).toBeInTheDocument
            expect(screen.getByText('Note 3')).toBeInTheDocument
        })
    })

    it('Should display proper message when there are not any owned notes',async()=>{
        jest.spyOn(noteService,'getOwnedNotes').mockImplementation(()=>Promise.resolve())

        render(
            <BrowserRouter>
               <OwnedNotesCollection/>
            </BrowserRouter>
        )

        const notesCards  = document.getElementsByClassName('note-preview-wrapper')

        await waitFor(()=>{
            expect(screen.getByText('Няма резултати')).toBeInTheDocument
            expect(notesCards).toHaveLength(0)
        })
    })
})
