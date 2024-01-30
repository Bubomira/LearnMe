import { render,waitFor,cleanup} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom'

import * as router from 'react-router'
import * as deckService from '../../../../services/entityService/deckService/deckServices'

import { BrowserRouter } from "react-router-dom";
import { DeckProvider } from "../../../../contexts/entityContexts/DeckContext";

import EditDeck from "./EditDeck";

afterEach(cleanup)

const mockedUseNavigate = jest.fn()

beforeEach(()=>{
    jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUseNavigate)
    jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({deckId:1}))
    jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

describe('Edit Deck Test',()=>{
    it('Should render correct deck information',async()=>{
        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({
            id:1,
            name:'Deck to be edited'
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                   <EditDeck/>
               </DeckProvider>
            </BrowserRouter>
        )
        const input  = document.querySelector('input');
        await waitFor(()=>{
            expect(input).toHaveValue('Deck to be edited')
        })
    })

    it('Should redirect to details page when everything is alright',async()=>{
        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({id:1,name:'Deck to be edited'}))
        jest.spyOn(deckService,'updateDeck').mockImplementation(()=>Promise.resolve())

        render( 
        <BrowserRouter>
            <DeckProvider>
                <EditDeck/>
            </DeckProvider>
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
        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({id:1,name:'My deck'}))
        jest.spyOn(deckService,'updateDeck').mockImplementation(()=>Promise.resolve(new Error()));

        render( 
            <BrowserRouter>
                <DeckProvider>
                    <EditDeck/>
                </DeckProvider>
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
        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({id:1,name:'My deck'}))

        render(
            <BrowserRouter>
                <DeckProvider>
                    <EditDeck/>
                </DeckProvider>
            </BrowserRouter>
        )

        const editBtn = document.querySelector('.edit-button')
        const input =document.querySelector('input')

        act(()=>{
              userEvent.click(editBtn);
              userEvent.clear(input)
        })

        await waitFor(()=>{
            expect(mockedUseNavigate).not.toHaveBeenCalled;
        })
    })
})
