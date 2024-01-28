import { screen,render,waitFor,cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom'

import * as flashcardService from '../../../../../../services/entityService/flashcardServices'
import * as router from 'react-router'

import { DeckContext, DeckProvider } from "../../../../../../contexts/entityContexts/DeckContext";
import { BrowserRouter } from "react-router-dom";

import FlashcardDetails from "./FlashcardDetails";

const mockedUsedNavigate = jest.fn();

jest.mock('../../../../../../hooks/useLoader',()=>{
    return{
        __esModule:true,
        default:()=>[true,jest.fn()]
    }
})

const deck ={
    id:1,
    flashcards:[
        {id:1,explanation:'First'},
        {id:2,explanation:'Second'},
        {id:3,explanation:'Third'}
    ]
 }

afterEach(cleanup)

describe(('Flashcard details tests'),()=>{

    it('Shoud render correct flashcard information',async()=>{

        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:1,
            definition:'My flashcard',
            explanation:'this'
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                  <FlashcardDetails/>
               </DeckProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
             expect(screen.getAllByText('this')).toBeInTheDocument
        })

    })

    it('Should flip flashcard when user clicks on it',async()=>{
        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:1,
            definition:'My flashcard',
            explanation:'this'
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                  <FlashcardDetails/>
               </DeckProvider>
            </BrowserRouter>
        )

        const flashcardDetails = document.querySelector('.flashcard-details')

       act(()=>{
          userEvent.click(flashcardDetails);
       })

        await waitFor(()=>{
             expect(screen.getAllByText('My flashcard')).toBeInTheDocument
        })

    })

    it('Should display owner buttons if flashcard belongs to user',async()=>{

        jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({deckId:1,flashcardId:1}))
     
        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:1,
            isOwnedByUser:true
         }))

        render(
            <BrowserRouter>
               <DeckProvider>
                  <FlashcardDetails/>
               </DeckProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.getByRole('link')).toHaveAttribute('href','/update/flashcard/1')
        })
    
    })
    
    it('Should go back in deck when back is used',async()=>{  
        
        jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({deckId:1,flashcardId:2}))

        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate)
        
        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:2,
            isOwnedByUser:true
         }))

        render(
            <BrowserRouter>
               <DeckContext.Provider value={{deck:deck}}>
                  <FlashcardDetails/>
               </DeckContext.Provider>
            </BrowserRouter>
        )

        const buttonForward = document.querySelector('p')
        act(()=>{
            userEvent.click(buttonForward)
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/deck/1/flashcard/1')
        })

    })

    it('Should go forward in deck when forward is used',async()=>{

        jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({deckId:1,flashcardId:2}));
        
        jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUsedNavigate)

        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:1,
        }))

        render(
            <BrowserRouter>
               <DeckContext.Provider value={{deck:deck}}>
                  <FlashcardDetails/>
               </DeckContext.Provider>
            </BrowserRouter>
        )

        const forwardBtn = document.querySelectorAll('p')[1];

        act(()=>{
            userEvent.click(forwardBtn)
        })

        await waitFor(()=>{
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/deck/1/flashcard/3')
        })
    })

    it('Should not be able to go forward if the card is the last of the deck',async()=>{

        jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({deckId:1,flashcardId:3}))

        jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUsedNavigate);

        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:3
        }))

        render(
            <BrowserRouter>
              <DeckContext.Provider value={{deck:deck}}>
                  <FlashcardDetails/>
              </DeckContext.Provider>
            </BrowserRouter>
        )
        const p = document.querySelectorAll('p');

        await waitFor(()=>{
            expect(p).toHaveLength(1);
        })
    })

    it('Should not be able to go forward if the card is the last of the deck',async()=>{

        jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({deckId:1,flashcardId:1}))

        jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUsedNavigate);

        jest.spyOn(flashcardService,'getFlashcardDetails').mockImplementation(()=>Promise.resolve({
            id:1
        }))

        render(
            <BrowserRouter>
              <DeckContext.Provider value={{deck:deck}}>
                  <FlashcardDetails/>
              </DeckContext.Provider>
            </BrowserRouter>
        )
        const p = document.querySelectorAll('p');

        await waitFor(()=>{
            expect(p).toHaveLength(1);
        })
    })
})

