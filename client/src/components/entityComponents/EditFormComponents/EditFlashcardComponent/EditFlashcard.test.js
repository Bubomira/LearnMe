import { render,waitFor,cleanup} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom'

import * as router from 'react-router'
import * as flashcardService from '../../../../services/entityService/flashcardServices'

import { BrowserRouter } from "react-router-dom";
import { DeckContext } from "../../../../contexts/entityContexts/DeckContext";

import EditFlashcard from "./EditFlashcard";

afterEach(cleanup)

const mockedUseNavigate = jest.fn()

beforeEach(()=>{
    jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUseNavigate)
    jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({flashcardId:1}))
    jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

describe('Edit Flashcard Test',()=>{
    it('Should render correct flashcard information',async()=>{
        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:1,
            definition:'Flashcard to be edited',
            explanation:'This'
        }))

        render(
            <BrowserRouter>
               <DeckContext.Provider value={{deck:{id:1}}}>
                   <EditFlashcard/>
               </DeckContext.Provider>
            </BrowserRouter>
        )
        const inputs  = document.querySelectorAll('input');
        await waitFor(()=>{
            expect(inputs[0]).toHaveValue('Flashcard to be edited')
            expect(inputs[1]).toHaveValue('This')
        })
    })

    it('Should redirect to details page when everything is alright',async()=>{
        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({id:1,name:'Deck to be edited'}))
        jest.spyOn(flashcardService,'updateFlashcard').mockImplementation(()=>Promise.resolve())

        render( 
        <BrowserRouter>
            <DeckContext.Provider value={{deck:{id:1}}}>
                <EditFlashcard/>
            </DeckContext.Provider>
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
        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({id:1,name:'My deck'}))
        jest.spyOn(flashcardService,'updateFlashcard').mockImplementation(()=>Promise.resolve(new Error()));

        render( 
            <BrowserRouter>
               <DeckContext.Provider value={{deck:{id:1}}}>
                    <EditFlashcard/>
              </DeckContext.Provider>
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
        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({id:1,name:'My deck'}))

        render(
            <BrowserRouter>
                <DeckContext.Provider value={{deck:{id:1}}}>
                    <EditFlashcard/>
              </DeckContext.Provider>
            </BrowserRouter>
        )

        const editBtn = document.querySelector('.edit-button')
        const inputs = document.querySelectorAll('input')

        act(()=>{
              userEvent.click(editBtn);
              userEvent.clear(inputs[0])
              userEvent.clear(inputs[1])
        })

        await waitFor(()=>{
            expect(mockedUseNavigate).not.toHaveBeenCalled;
        })
    })
})
